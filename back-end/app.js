// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
const _ = require("lodash"); 

const listingSchema = require('./models/listing');

// Postman  https://web.postman.co/
//Mocha and chai are unit testing
// ngrok is a tool to output a public URL for the webserver running locally 
const multer = require('multer') // extract files from requests

const path = require('path')

var cors = require('cors')
app.use(cors())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'ProfilePicture/UserPFPs')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, file.originalname)
  }
})

const upload_pfp = multer({storage, storage})

let filter_settings = {};

// we will put some server logic here later...
app.use(morgan("dev")) // dev style gives a concise color-coded style of log output
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
// app.use(express.static("../front-end/public"))

// custom middleware - first
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

  app.get('/get-listings', (req, res, next) => {
    const listings = [listingSchema.generateMockListing(),
      listingSchema.generateMockListing(),
      listingSchema.generateMockListing(),
      listingSchema.generateMockListing(),
      listingSchema.generateMockListing()
    ];
   
    console.log(filter_settings)
    
    const filterSettings = filter_settings;
    const filteredListings = filterListings(listings, filterSettings);

    res.json(filteredListings);
  })

  function filterListings(listings, filterSettings){
    return listings.filter(listing => {

      //tbd once filter front end is fixed
  
      return true;






    }
    
    
    
    
    )
    
  }

app.use(express.static(path.join(__dirname, '../front-end/build')))

app.get("/get-search-settings", (req, res) => {
  let response
  if(Object.keys(filter_settings).length == 0){
    let data = listingSchema.listingData
    let propertyTypes = Object.fromEntries(data.basicDetails.propertyType.enum.map(x => [String(x), true]))
    let amenities = Object.fromEntries(data.amenities[0].enum.map(x => [String(x), true]))
    response = {
                "PropertyTypes": propertyTypes,
                "Amenities": amenities
               }
  }
  else{
    response = filter_settings
  }
  res.json(response);
})

app.get("/get-user-filter", (req, res) => {
  res.json(filter_settings);
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front-end/build/index.html'))
})

app.post("/post-user-filter", (req, res) => {
  filter_settings = req.body;
  console.log(req.body);
  res.send("saved user data");
})

app.post("/upload-pfp", upload_pfp.single("image"), (req, res) => {
  console.log("Profile Picture Uploaded");
})

app.post("/get-user-data", async (req, res) => {
  if (_.isEqual(req.body, {"userCountry": "", "userState": "", "userCity": "", "userAddress": ""})){
    console.log("Invalid Location Data");
    res.status(404).end();
  }
  else{
    const userLocation = JSON.stringify(req.body);
    console.log(userLocation);
    res.send("saved user data"); 
  } 
})

// export the express app we created to make it available to other modules
module.exports = app