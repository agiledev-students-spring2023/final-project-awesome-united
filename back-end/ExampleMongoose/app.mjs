import './db.mjs';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';

import path from 'path';
import url from 'url';
import * as auth from './auth.mjs';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const app = express();

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

const Article = mongoose.model('Article');

const loginMessages = {"PASSWORDS DO NOT MATCH": 'Incorrect password', "USER NOT FOUND": 'User doesn\'t exist'};
const registrationMessages = {"USERNAME ALREADY EXISTS": "Username already exists", "USERNAME PASSWORD TOO SHORT": "Username or password is too short"};


///////////////////////
// CUSTOM MIDDLEWARE //
///////////////////////

// require authenticated user for /article/add path
app.use(auth.authRequired(['/article/add']));

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

// logging
app.use((req, res, next) => {
  console.log(req.method, req.path, req.body);
  next();
});

////////////////////
// ROUTE HANDLERS //
////////////////////
app.get('/', (req, res) => {
  Article.find({}).sort('-createdAt').exec((err, articles) => {
    res.render('index', {user: req.session.user, home: true, articles: articles});
  });
});

app.get('/article/add', (req, res) => {
  //check user
  if(!req.session.user){
    res.render('/login'); //redirect to login if no user
  }
  //render template
  res.render('article-add');
});

app.post('/article/add', (req, res) => {
  // TODO: complete POST /article/add
  if(!req.session.user){
    res.render('/login'); //redirect to login if no user
  }
  const Article = mongoose.model('Article');
  const a = new Article({
    title: req.body.title,
    url: req.body.url,
    description: req.body.description,
    //user: req.session.user._id,
    user: req.session.user,
});
    a.save((err,saved)=>{
      if(err){
          console.log(err);
          res.render('article-add', {message: 'err with adding article???'});
      } else{
          console.log(saved);
          res.redirect('/');
      }
  });
});

app.get('/article/:slug', (req, res) => {
  // TODO: complete GET /article/slug
  Article.findOne({slug:req.params.slug}).exec((err, article) => {
    res.render('article-detail', {user: req.session.user, article: article});
  });
  //res.render('article-detail', {user: req.session.user, articles: articles});
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  // setup callbacks for register success and error
  function success(newUser) {
    auth.startAuthenticatedSession(req, newUser, (err) => {
        if (!err) {
            res.redirect('/');
        } else {
            res.render('error', {message: 'err authing???'}); 
        }
    });
  }

  function error(err) {
    res.render('register', {message: registrationMessages[err.message] ?? 'Registration error'}); 
  }

  // attempt to register new user
  auth.register(req.body.username, req.body.email, req.body.password, error, success);
});
        

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
  // setup callbacks for login success and error
  function success(user) {
    auth.startAuthenticatedSession(req, user, (err) => {
      if(!err) {
        res.redirect('/'); 
      } else {
        res.render('error', {message: 'error starting auth sess: ' + err}); 
      }
    }); 
  }

  function error(err) {
    res.render('login', {message: loginMessages[err.message] || 'Login unsuccessful'}); 
  }

  // attempt to login
  auth.login(req.body.username, req.body.password, error, success);
});

app.listen(3000);
