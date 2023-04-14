require("dotenv").config({ silent: true }); // load environmental variables from a hidden file named .env
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

// set up some JWT authentication options
let jwtOptions = {};
const mongoose = require("mongoose");

const userSchema = require("./models/user");
const User = userSchema.User;
mongoose.connect(process.env.DB_URI, {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  pass: process.env.DB_PASSWORD,
});
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt"); // look for the Authorization request header
jwtOptions.secretOrKey = process.env.JWT_SECRET; // an arbitrary string used during encryption - see the .env file
// console.log(jwtOptions) // debug to make sure the secret from the .env file is loaded correctly
// passport can work with many authentication systems... here we are setting some middleware code for using JWT that we'll pass to passport to use
const jwtStrategy = new JwtStrategy(jwtOptions, async function (
  jwt_payload,
  next
) {
  const accountExists = await User.findOne({ id: jwt_payload.id }).exec();
  const userData = {
    id: accountExists.id,
    userName: accountExists.userName,
    firstName: accountExists.firstName,
    lastName: accountExists.lastName,
    email: accountExists.email,
  }
  if (accountExists) {
    next(null, userData);
  } else {
    next(null, false);
  }
});

module.exports = {
  jwtOptions,
  jwtStrategy,
};
