// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const morgan = require("morgan"); // middleware for nice logging of incoming HTTP requests
const _ = require("lodash");
const mongoose = require("mongoose");
const listingSchema = require("./models/listing");
const userSchema = require("./models/user");
const uuid = require("uuid");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
app.use(passport.initialize()); // tell express to use passport middleware
const { jwtOptions, jwtStrategy } = require("./jwt-config.js");
passport.use(jwtStrategy);

dotenv.config();

// Postman  https://web.postman.co/
//Mocha and chai are unit testing
// ngrok is a tool to output a public URL for the webserver running locally
const multer = require("multer"); // extract files from requests

const path = require("path");

mongoose
  .connect(process.env.DB_URI, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
  })
  .then(() => {
    console.log("Connection established to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
var cors = require("cors");
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "ProfilePicture/UserPFPs");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload_pfp = multer({ storage, storage });

let current_user = null;

// we will put some server logic here later...
app.use(morgan("dev")); // dev style gives a concise color-coded style of log output
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

app.get("/get-listings", (req, res, next) => {
  const listings = [listingSchema.generateMockListing(),
      listingSchema.generateMockListing(),
      listingSchema.generateMockListing(),
      listingSchema.generateMockListing(),
      listingSchema.generateMockListing()
    ];
 
    console.log("filtering listings")
    console.log(current_user.filter)
    
    const filterSettings = current_user.filter;
    const filteredListings = filterListings(listings, filterSettings);

    res.json(filteredListings);
});

app.get(
  "/auth",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      user: req.user,
    });
  }
);

function filterListings(listings, filterSettings){
  return listings.filter(listing => {
    if(filterSettings.Amenities != undefined){
      listing.amenities.forEach(amenity => {
        if(!filterSettings.Amenities[amenity]){
          console.log("Filtered out: missing amenity");
          return false;
        }
      });
    }
    if(filterSettings.propertyTypes != undefined && !filterSettings.PropertyTypes[listing.basicDetails.propertyType]){
      console.log("Filtered out: wrong property type");
      return false;
    }
    let match = true;
    [(filterSettings.PriceRange != undefined ? {listingValue: listing.listingDetails.price, filterRange: filterSettings.PriceRange, name: "price"} : null),
    (filterSettings.NumberofBeds != undefined ? {listingValue: listing.basicDetails.bedrooms, filterRange: filterSettings.NumberofBeds, name: "number of beds"} : null),
    (filterSettings.NumberofBathrooms != undefined ? {listingValue: listing.basicDetails.bathrooms, filterRange: filterSettings.NumberofBathrooms, name: "number of bathrooms"} : null)]
    .forEach((prop) => {
      if(prop != null){
        console.log(prop.name)
        if(prop.listingValue < prop.filterRange.min || prop.listingValue > prop.filterRange.max){
          console.log("Filtered out: " + prop.name + " out of range")
          match = false;
          return false;
        }
      }
    });
    return match;
  })    
}

const generateFilter = (req, res, next) => {
  let data = listingSchema.listingData;
  let propertyTypes = Object.fromEntries(
    data.basicDetails.propertyType.enum.map((x) => [String(x), true])
  );
  let amenities = Object.fromEntries(
    data.amenities[0].enum.map((x) => [String(x), true])
  );
  req.body.filter = {
    PropertyTypes: propertyTypes,
    Amenities: amenities,
    PriceRange: {min: 100000, max: 1000000},
    NumberofBeds: {min: 0, max: 10},
    NumberofBathrooms: {min: 0, max: 10}
  };
  next();
};

app.use(express.static(path.join(__dirname, '../front-end/build')))

app.get("/get-search-settings", (req, res) => {
  let response;
  if (current_user == null){
    res.json({});
  } else {
    res.json(current_user.filter);
  }
});

app.get("/get-user-filter", (req, res) => {
  res.json(current_user.filter);
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/build/index.html"));
});

app.post("/post-user-filter", (req, res) => {
  current_user.filter = req.body;
  console.log(req.body);
  res.send("saved user data");
});

app.post("/upload-pfp", upload_pfp.single("image"), (req, res) => {
  console.log("Profile Picture Uploaded");
});

const User = userSchema.User;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  bodyParser.json(req);

  const userName = req.body.userName;
  const email = req.body.email;
  const usernameExists = await User.findOne({ userName: userName }).exec();
  if (usernameExists) {
    next(new Error("Username already exists"));
  }
  const emailExists = await User.findOne({ email: email }).exec();
  if (!usernameExists && emailExists) {
    next(new Error("Email already exists"));
  }
  if (!emailExists && !usernameExists) {
    next();
  }
};

const hashPassword = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    req.body.hashedPassword = hash;
    next();
  });
};

const createAccountInDatabase = (req, res, next) => {
  console.log(req.body);

  const newUser = new User({
    userName: req.body.userName,
    passwordHash: req.body.hashedPassword,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    id: uuid.v4(),
    accountType: req.body.accountType,
    filter: req.body.filter
  });
  newUser
    .save()
    .then((user) => {
      res.status(200).send("OK");
    })
    .catch((error) => {
      res.status(400).send("Could not save to DB");
    });
};

app.post(
  "/create-account",
  checkDuplicateUsernameOrEmail,
  hashPassword,
  generateFilter,
  createAccountInDatabase
);

const checkLoginDetails = async (req, res, next) => {
  bodyParser.json(req);
  console.log(req.body);
  const userName = req.body.userName;
  const reqPassword = req.body.password;

  const account = await User.findOne({ userName: userName }).exec();

  if (!account) {
    next(new Error("User does not exist"));
  } else {
    bcrypt.compare(reqPassword, account.passwordHash, (err, result) => {
      if (result === true) {
        req.account = account;
        next();
      } else {
        next(new Error("Incorrect password"));
      }
    });
  }
};

const sendAuthTokens = (req, res, next) => {
  const payload = {
    userName: req.account.userName,
    firstName: req.account.firstName,
    lastName: req.account.lastName,
    email: req.account.email,
    id: req.account.id,
    accountType: req.account.accountType,
    filter: req.account.filter
  };

  console.log(payload);
  const token = jwt.sign(payload, jwtOptions.secretOrKey);
  console.log(token);
  res.status(200).json({
    success: true,
    token: token,
  });
  next();
};

const setCurrentUser = (req, res, next) => {
  console.log("setting current_user")
  current_user = req.account;
  next();
}

app.post("/login", checkLoginDetails, sendAuthTokens, setCurrentUser);

app.post("/get-user-data", async (req, res) => {
  if (
    _.isEqual(req.body, {
      userCountry: "",
      userState: "",
      userCity: "",
      userAddress: "",
    })
  ) {
    console.log("Invalid Location Data");
    res.status(404).end();
  } else {
    const userLocation = JSON.stringify(req.body);
    console.log(userLocation);
    res.send("saved user data");
  }
});
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});
// export the express app we created to make it available to other modules
module.exports = app;