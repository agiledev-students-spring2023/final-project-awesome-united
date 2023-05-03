// import and instantiate express
const auth = require("./authenticate.js");
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const session = require("express-session");
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
const seenListingSchema = require("./models/seenListing");
const chatRoute = require("./routes/Chat");
const matchRoute = require("./routes/Matches");

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
const { seenListing } = require("./models/seenListing.js");
app.use(cors());

const sessionOptions = {
  secret: "secret for signing session id",
  saveUninitialized: false,
  resave: false,
};

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

// we will put some server logic here later...

app.use(session(sessionOptions)); // gives us req.session
app.use(morgan("dev")); // dev style gives a concise color-coded style of log output
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data
app.use('/images', express.static('images'));

app.use(function (req, res, next) {
  //cookie parsing
  const cookie = req.get("Cookie");
  if (cookie === undefined) {
    console.log("empty cookie");
  } else {
    const pairs = cookie.split(";");
    req.myCookies = {};
    for (let i = 0; i < pairs.length; i++) {
      const nameVal = pairs[i].split("=");
      req.myCookies[nameVal[0].trim()] = nameVal[1];
    } //parse cookie values into the myCookies property object
    console.log(req.method, req.path);
  }
  next();
});
app.use(function (req, res, next) {
  //logging middleware
  console.log("Request Method : ", req.method);
  console.log("Request Path : ", req.path);
  console.log("Request Query : ", req.query);
  console.log("Request Body : ", req.body);
  console.log("Request Cookies : ");
  if (req.myCookies === undefined) {
    console.log("No Cookies");
    res.locals.user = "seller";
  } else {
    for (const [key, value] of Object.entries(req.myCookies)) {
      if (key === "connect.sid") {
        console.log("connect.sid=[REDACTED]");
      } else {
        console.log(`${key} = ${value}`);
      }
    }
    res.locals.user = "buyer";
  }
  next();
});
app.use(function (req, res, next) {
  //host header checking
  const host = req.get("Host");
  if (host === undefined) {
    console.log("HTTP/1.1 400 Bad Request");
    console.log("X-Powered-By: Express");
    console.log("Content-Type: text/html; charset=utf-8");
    console.log("Host Header Undefined");
  } else {
    console.log("Host Header Present");
  }
  next();
});

// require authenticated user for /article/add path
// app.use(auth.authRequired(['/get-listings']));

// make {{user}} variable available for all paths
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});
//if you have user session authenticated
// add req.session.user to every context object for templates
app.use((req, res, next) => {
  // now you can use {{user}} in your template!
  res.locals.user = req.session.user;
  next();
});
// custom middleware - example
app.use((req, res, next) => {
  // make a modification to either the req or res objects
  res.addedStuff = "First middleware function run!";
  // run the next middleware function, if any
  next();
});
// custom middleware - second
app.use((req, res, next) => {
  // make a modification to either the req or res objects
  res.addedStuff += " Second middleware function run!";
  // run the next middleware function, if any
  next();
});
// route for HTTP GET requests to /middleware-example
app.get("/middleware-example", (req, res) => {
  // grab data passed along by the middleware, if available
  const message = res.addedStuff
    ? res.addedStuff
    : "Sorry, the middleware did not work!";
  // use the data added by the middleware in some way
  res.send(message);
});

app.post("/get-listings", passport.authenticate("jwt", { session: false }), 
async (req, res) => {
  let listings;
 
  listings = await listingSchema.Listing.aggregate([
    {
      $lookup: {
        from: "seenlistings",
        let: { listingId: "$listingId", userId: "$userId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$listingId", "$$listingId"] },
                  { $eq: ["$userId", "$$userId"] },
                ],
              },
            },
          },
        ],
        as: "seen",
      },
    },
    {
      $redact: {
        $cond: {
          if: { $eq: [{ $size: "$seen" }, 0] },
          then: "$$KEEP",
          else: "$$PRUNE",
        },
      },
    },
    {
      $sample: { size: 10 },
    },
    {
      $addFields: {
        seen: {
          $cond: {
            if: { $eq: [{ $size: "$seen" }, 1] },
            then: true,
            else: false,
          },
        },
      },
    },
  ]).exec();

  const user = await User.findOne({ id: req.user.id }).exec();
  const filterSettings = user.filter;
  const filteredListings = filterListings(listings, filterSettings);

  console.log(filteredListings);

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

function filterListings(listings, filterSettings) {
  return listings.filter((listing) => {
    if (true /*filterSettings.Amenities != undefined*/) {
      for (const [amenity, need] of Object.entries(filterSettings.Amenities)) {
        if (need && !listing.amenities.includes(amenity)) {
          //console.log("Filtered out: missing " + amenity);
          return false;
        }
      }
    }
    if (
      /*filterSettings.propertyTypes != undefined &&*/ !filterSettings
        .PropertyTypes[listing.basicDetails.propertyType]
    ) {
      //console.log("Filtered out: wrong property type");
      return false;
    }
    let match = true;
    [
      filterSettings.PriceRange != undefined
        ? {
            listingValue: listing.listingDetails.price,
            filterRange: filterSettings.PriceRange,
            name: "price",
          }
        : null,
      filterSettings.NumberofBeds != undefined
        ? {
            listingValue: listing.basicDetails.bedrooms,
            filterRange: filterSettings.NumberofBeds,
            name: "number of beds",
          }
        : null,
      filterSettings.NumberofBathrooms != undefined
        ? {
            listingValue: listing.basicDetails.bathrooms,
            filterRange: filterSettings.NumberofBathrooms,
            name: "number of bathrooms",
          }
        : null,
    ].forEach((prop) => {
      if (prop != null) {
        //console.log(prop.name);
        if (
          prop.listingValue < prop.filterRange.min ||
          prop.listingValue > prop.filterRange.max
        ) {
          //console.log("Filtered out: " + prop.name + " out of range");
          match = false;
          return false;
        }
      }
    });
    return match;
  });
}

const generateFilter = (req, res, next) => {
  let data = listingSchema.listingData;
  let propertyTypes = Object.fromEntries(
    data.basicDetails.propertyType.enum.map((x) => [String(x), true])
  );
  let amenities = Object.fromEntries(
    data.amenities[0].enum.map((x) => [String(x), false])
  );
  req.body.filter = {
    PropertyTypes: propertyTypes,
    Amenities: amenities,
    PriceRange: { min: 100000, max: 1000000 },
    NumberofBeds: { min: 0, max: 10 },
    NumberofBathrooms: { min: 0, max: 10 },
  };
  next();
};

app.use(express.static(path.join(__dirname, "../front-end/build")));

app.get("/get-search-settings",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findOne({ id: req.user.id }).exec();
    res.json(user.filter);
  }
);

app.post("/post-user-filter", passport.authenticate("jwt", { session: false }), 
async (req, res) => {
  const status = await User.updateOne({ id: req.user.id }, {filter: req.body}).exec();
  res.send(status.acknowledged ? "acknowledged" : "not acknowledged");
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/build/index.html"));
});
const seenListingModel = seenListingSchema.seenListing;
app.post("/see-listing", (req, res) => {
  bodyParser.json(req);
  const reqUserId = req.body.userId;
  const reqListingId = req.body.listingId;

  const newSeenListing = new seenListingModel({
    userId: reqUserId,
    listingId: reqListingId,
  });
  console.log(newSeenListing.collection.name);
  newSeenListing
    .save()
    .then((seenListing) => {
      res.status(200).send("OK");
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("Could not save to DB");
    });

  // Listings.aggregate([
  //   {
  //     $lookup: {
  //       from: 'seenListing',
  //       let: { listingId: '$_id', userId: '$userId' },
  //       pipeline: [
  //         {
  //           $match: {
  //             $expr: { $and: [
  //               { $eq: ['$listingId', '$$listingId'] },
  //               { $eq: ['$userId', '$$userId'] }
  //             ]}
  //           }
  //         }
  //       ],
  //       as: 'seen'
  //     }
  //   },
  //   {
  //     $addFields: {
  //       seen: {
  //         $cond: {
  //           if: { $eq: [{ $size: '$seen' }, 1] },
  //           then: true,
  //           else: false
  //         }
  //       }
  //     }
  //   },
  //   {
  //     $limit: 20
  //   }
  // ])
  // .exec((err, results) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(results);
  //   }
  // });
});

const name = async (req, res, next) => {
  await User.updateOne({ id: res.locals.user.id }, { filter: res.locals.user.filter }).exec();
  console.log(req.body);
  res.send("saved user data");
};

app.post("/upload-pfp", upload_pfp.single("image"), (req, res) => {
  console.log("Profile Picture Uploaded");
});

const User = userSchema.User;
const Listing = listingSchema.Listing;

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
    filter: req.body.filter,
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

const createListingInDatabase = async (req, res, next) => {
  console.log(req.body);

  const newListing = {
    id: req.user.id,
    location: {
      streetAddress: req.body.listingAddress,
      unitNumber: req.body.listingUnitNumber,
      city: req.body.listingCity,
      state: req.body.listingState,
      zip: req.body.listingZipcode
    },
    listingDetails: {
      status: req.body.listingStatus,
      price: req.body.listingPrice
    },
    basicDetails: {
      propertyType: req.body.listingPropertyType,
      bedrooms: req.body.listingBedroomsNum,
      bathrooms: req.body.listingBathroomsNum
    },
    agent: {
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName
    },
    amenities: req.body.listingAmenities,
    images: req.body.listingPhotos
  };
  if (req.listingExists == true){
    const status = Listing.updateOne({id: req.user.id}, newListing).exec();
    res.status(200).send("Listing Updated");
  }
  else{
    new Listing(newListing)
    .save()
    .then((newListing) => {
      //res.status(200).send("OK");
      console.log("success");
    })
    .catch((error) => {
      console.log(newListing);
      //res.statusCode = 404;
      console.log(error);
      //res.send("Could not save to DB");
    });  
  }
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
    filter: req.account.filter,
  };

  console.log(payload);
  const token = jwt.sign(payload, jwtOptions.secretOrKey);
  console.log(token);
  res.status(200).json({
    success: true,
    token: token,
    user: payload
  });
  next();
};

app.post("/login", checkLoginDetails, sendAuthTokens);

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

const checkIfListingExists = async (req, res, next) => {
  if (
    _.isEqual(req.body, {
      listingCountry: "",
      listingState: "",
      listingCity: "",
      listingAddress: "",
      listingPrice: "",
      listingAmenitiesNum: "",
      listingBathroomsNum: "",
      listingDescription: "",
    })
  ) {
    console.log("Invalid Listing Data");
    //res.status(404).end();
  } else {
    const sellerListing = JSON.stringify(req.body);
    console.log(sellerListing);
    const curr_listing = await Listing.findOne({ id: req.user.id }).exec();
    console.log(curr_listing);
    if (curr_listing != null){
      console.log("listing already exists");
      req.listingExists = true;
    }
    else{
      req.listingExists = false;
    }
    next();
  }
}  

app.post("/get-listing-data", passport.authenticate("jwt", { session: false }), checkIfListingExists, createListingInDatabase);

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.use("/back-end/chat", chatRoute);
app.use("/back-end/matches", matchRoute);
// export the express app we created to make it available to other modules
module.exports = app;
