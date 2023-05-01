// import and instantiate express
const auth = require('./authenticate.js');
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const session = require('express-session')
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
const seenListingSchema = require("./models/seenListing")
const chatRoute = require("./routes/Chat");
const matchRoute = require("./routes/Matches")

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
const { seenListing } = require('./models/seenListing.js');
app.use(cors());

const sessionOptions = { 
  secret: 'secret for signing session id', 
  saveUninitialized: false, 
  resave: false 
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

let current_user = null;

// we will put some server logic here later...

app.use(session(sessionOptions));// gives us req.session
app.use(morgan("dev")) // dev style gives a concise color-coded style of log output
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
// app.use(express.static("../front-end/public"))


app.use(function(req, res, next) { //cookie parsing
  const cookie = req.get('Cookie');
  if(cookie === undefined){
      console.log('empty cookie');
  }else{
      const pairs = cookie.split(';');
      req.myCookies = {};
      for(let i = 0; i< pairs.length;i++){
          const nameVal = pairs[i].split('=');
          req.myCookies[nameVal[0].trim()] = nameVal[1];
      } //parse cookie values into the myCookies property object
      console.log(req.method, req.path);
  }
  next();
});
app.use(function(req,res,next) { //logging middleware
  console.log('Request Method : ',req.method);
  console.log('Request Path : ', req.path);
  console.log('Request Query : ', req.query);
  console.log('Request Body : ',req.body );
  console.log('Request Cookies : ');
  if(req.myCookies === undefined){
      console.log('No Cookies');
      res.locals.user = 'seller'
  } else{
      for (const [key, value] of Object.entries(req.myCookies)) {
          if(key ==='connect.sid'){
              console.log('connect.sid=[REDACTED]');
          } else{
              console.log(`${key} = ${value}`);
          }
      }
      res.locals.user = 'buyer'
  }
  next();
});
app.use(function(req, res, next) { //host header checking
  const host = req.get('Host');
  if(host === undefined){
      console.log('HTTP/1.1 400 Bad Request');
      console.log('X-Powered-By: Express');
      console.log('Content-Type: text/html; charset=utf-8');
      console.log('Host Header Undefined');
  }else{
      console.log('Host Header Present');
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
    res.addedStuff = "First middleware function run!"
    // run the next middleware function, if any
    next()
  })
// custom middleware - second
app.use((req, res, next) => {
    // make a modification to either the req or res objects
    res.addedStuff += " Second middleware function run!"
    // run the next middleware function, if any
    next()
  })
// route for HTTP GET requests to /middleware-example
app.get("/middleware-example", (req, res) => {
    // grab data passed along by the middleware, if available
    const message = res.addedStuff
      ? res.addedStuff
      : "Sorry, the middleware did not work!"
    // use the data added by the middleware in some way
    res.send(message)
  })

  app.get('/get-listings', async (req, res) => {
    let listings;
 
    listings = await listingSchema.Listing.aggregate().sample(3).exec()
    console.log("filtering listings")
    // console.log(current_user.filter)
    
    // const filterSettings = current_user.filter;
    // const filteredListings = filterListings(listings, filterSettings);

    res.json(listings);
  })

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
    if(true/*filterSettings.Amenities != undefined*/){
      for (const [amenity, need] of Object.entries(filterSettings.Amenities)){
        if(need && !listing.amenities.includes(amenity)){
          console.log("Filtered out: missing " + amenity);
          return false;
        }
      }
    }
    if(/*filterSettings.propertyTypes != undefined &&*/ !filterSettings.PropertyTypes[listing.basicDetails.propertyType]){
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
const seenListingModel = seenListingSchema.seenListing;
app.post("/see-listing", (req, res) => {
  bodyParser.json(req);
  const userId = req.body.userId;
  const listingId = req.body.listingId;
  
  
  Listings.aggregate([
    {
      $lookup: {
        from: 'seenListing',
        let: { listingId: '$_id', userId: '$userId' },
        pipeline: [
          {
            $match: {
              $expr: { $and: [
                { $eq: ['$listingId', '$$listingId'] },
                { $eq: ['$userId', '$$userId'] }
              ]}
            }
          }
        ],
        as: 'seen'
      }
    },
    {
      $addFields: {
        seen: {
          $cond: { 
            if: { $eq: [{ $size: '$seen' }, 1] },
            then: true,
            else: false
          }
        }
      }
    },
    {
      $limit: 20
    }
  ])
  .exec((err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
    }
  });
  





})

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

app.use("/back-end/chat", chatRoute);
app.use("/back-end/matches", matchRoute);
// export the express app we created to make it available to other modules
module.exports = app;