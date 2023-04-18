// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const session = require('express-session')
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
const _ = require("lodash"); 
const auth = require('./authenticate.js');

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
app.use(auth.authRequired(['/get-listings']));

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

  app.get('/get-listings', (req, res) => {
    if(req.session.user = 'buyer'){
      const listing = listingSchema.generateMockListing();
      res.json(listing);
      console.log('you are a buyer')
    }
    else if(req.session.user = 'seller'){
      const listing = listingSchema.generateMockListing();
      res.json(listing);
      console.log('you are a seller')
    }
    else{
      const listing = listingSchema.generateMockListing();
      res.json(listing);
      console.log('you are neither a buyer nor seller')
    }
    
  })

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