const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// assumes that User was registered in `./db.mjs`
//const User = mongoose.model('User');

const startAuthenticatedSession = (req, user, cb) => {
  //https://www.npmjs.com/package/express-session#sessionregeneratecallback
  //https://expressjs.com/en/api.html#res.locals 
  // TODO: implement startAuthenticatedSession
  req.session.regenerate(function(err) {
    // will have a new session here
    console.log('start new authenticated session', user);
    if(err){
      console.log("Error while Regenerating");
      cb(err);
    } else{
      console.log("adding the user");
      req.session.user = user; 
      cb();
    }
  });
};


// helper function for register
function hashPassword(password, cb) {
  bcrypt.genSalt(function(err, salt) {
    if (!err) {  
      // create hash with salt
      bcrypt.hash(password, salt, function(err, hash) {
        if (!err) {  
          cb(err, hash);
        } else {
          // hash error 
          cb(err);
        }
      });
    } else {
      // gen salt error 
      cb(err);
    }
  });
}
const register = (username, email, password, errorCallback, successCallback) => {
  // NOTE: does not look for duplicate emails, tho
  if (username.length >= 8 && password.length >= 8) {
    User.find({username: username}, (err, users, count) => {
      if (!err && count === undefined && users.length === 0) {
        hashPassword(password, (err, hash) => {
          if(!err) {
            // TODO: create and save a user
            password = hash;
            console.log("hash successful");
            const u = new User({
              username: username,
              email: email,
              password: password
            });
            u.save((err,saved)=>{
              if(err){
                  console.log(err);
                  errorCallback({message: 'DOCUMENT SAVE ERROR '+err});
              } else{
                  console.log(saved);
                  successCallback(saved);
              }
            });
            // call errorCallback or successCallback as necessary
            // make sure the error message match!
          } else {
            console.log('Hash Error');
            errorCallback({message: 'HASH ERROR ' + err});
          }
        });
      } else {
        // TODO: handle user already exists case
        console.log('USERNAME ALREADY EXISTS ');
        errorCallback({message: 'USERNAME ALREADY EXISTS '});
      }
    });
  } else {
    console.log('USERNAME PASSWORD TOO SHORT');
    errorCallback({message: 'USERNAME PASSWORD TOO SHORT'});
  }
}




const login = (username, password, errorCallback, successCallback) => {
  // TODO: implement login
  User.findOne({username: username}, (err, user) => {
    if (!err && user) {
            // compare with form password!
      bcrypt.compare(password, user.password, (err, passwordMatch) => {
      // regenerate session if passwordMatch is true
      if(passwordMatch){
        console.log("Please Regenerate Session, password Match True");
        successCallback(user); //how to callback WITH the matched User?
      } else{
        console.log(err);
        errorCallback({message: 'PASSWORDS DO NOT MATCH '});
      }
      });
    } else if(!user){
      console.log(err);
      errorCallback({message: 'USER NOT FOUND ' + err});
    }
   });
};

// creates middleware that redirects to login if path is included in authRequiredPaths
const authRequired = authRequiredPaths => {
  return (req, res, next) => {
    if(authRequiredPaths.includes(req.path)) {
      if(!req.session.user) {
        res.redirect('/login'); 
      } else {
        next(); 
      }
    } else {
      next(); 
    }
  };
};

exports.startAuthenticatedSession = startAuthenticatedSession;
exports.register = register;
exports.login = login;
exports.authRequired = authRequired;
/*
export {
  startAuthenticatedSession,
  register,
  login,
  authRequired
};
*/