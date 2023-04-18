import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// assumes that User was registered in `./db.mjs`
const User = mongoose.model('User');

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

/*
const endAuthenticatedSession = (req, cb) => {
  // TODO: implement endAuthenticatedSession
  req.session.regenerate(function(err) {
    // will have a new session here
    if(err){
      console.log("Error while Regenerating");
      cb(err);
    } else{
      req.session.username = user; 
    }
  });

}; */

/*
const singleRowToObj = (headers, row) => {
  return row.reduce((obj, val, index) => {
      return{...obj, [headers[index]]:val};
  },{});
};

function rowsToObjects({headers,rows}){
  //const heads = data.headers;
  //const twoDimen = data.rows;
  return rows.map(row => singleRowToObj(headers,row));
}
function myReadFile(fileName,successFn,errorFn){
  fs.readFile(fileName, 'utf-8', (err,data)=>{
      if(err){
          errorFn(err);
      }
      else{
          successFn(data);
      }
  });
}; */


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
function register(username, email, password, errorCallback, successCallback) {
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


/*
const register = (username, email, password, errorCallback, successCallback) => {
  // TODO: implement register
  errObj = {};
  if(username.length()<8 || password.length()<8){
    errObj.message="USERNAME PASSWORD TOO SHORT";
    errorCallback(errObj);
  } 
  User.findOne({ username:username }, (err, result, count) => {
    if(result){
      errObj.message="USERNAME ALREADY EXISTS";
      errorCallback(errObj);
    } 
  });
  // you can use a default value of 10 for salt rounds 
  myPlaintextPassword = password;
  saltRounds = 10;
  bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    if(err){
      errObj.message="HASH ERROR";
      errorCallback(errObj);
    } else{
      password = hash;
      console.log("hash successful")
    }
    // do more stuff here!
  });
  const u = new User({
    username: username,
    email: email,
    password: password
  });
  u.save((err,saved)=>{
    if(err){
        console.log(err);
        errObj.message="DOCUMENT SAVE ERROR";
        errorCallback(errObj);
    } else{
        console.log(saved);
        successCallback();
    }
  });
}; */

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

export {
  startAuthenticatedSession,
  //endAuthenticatedSession,
  register,
  login,
  authRequired
};
