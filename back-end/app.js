// import and instantiate express
const express = require("express") // CommonJS import style!
const app = express() // instantiate an Express object
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
// Postman  https://web.postman.co/
//Mocha and chai are unit testing
// ngrok is a tool to output a public URL for the webserver running locally 
const multer = require('multer') // extract files from requests

const path = require('path')

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

app.use(express.static(path.join(__dirname, '../front-end/build')))
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front-end/build/index.html'))
})

app.post("/post-search-settings", (req, res) => {
  res.send("saved user data");
})

// export the express app we created to make it available to other modules
module.exports = app