import express from 'express';
const app = express();

//WSL on vs code, just ytpe code on powershell
//open folder on explorer: exploerer.exe .
//node install will just install stuff from package

// some req object attributes
// .path
// .method
// .query
// .body (from express.urlencoded)
// .get (retrieve a header)

//cookies https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

// expression session middleware
// req.session <---- store data for some client session
// req.session.visits += 1

import session from 'express-session';

const sessionOptions = { 
    secret: 'secret for signing session id', 
    saveUninitialized: false, 
    resave: false 
};

const dragons = [
    {dragonName:'Syrax', rider: 'Rhaenyra', identification: 'giant yellow-scaled dragon', house: 'Targaryen'},
    {dragonName:'Caraxes', rider: 'Daemon', identification: 'large red dragon', house: 'Targaryen'},
    {dragonName:'Seasmoke', rider: 'Laenor', identification: 'silver-gray dragon', house: 'Velaryon'},
    {dragonName:'Meleys', rider: 'Rhaenys', identification: 'swift red and pink dragon', house: 'Targaryen'}
];

// gives us req.session
app.use(session(sessionOptions));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'hbs');

//https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-171.php
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
    } else{
        for (const [key, value] of Object.entries(req.myCookies)) {
            if(key ==='connect.sid'){
                console.log('connect.sid=[REDACTED]');
            } else{
                console.log(`${key} = ${value}`);
            }
        }
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
app.get('/makecookies', (req, res) => {
  // res.append
  // * allows same header to appear more than once / set 
  //   multiple headers with same name
  res.append('Set-Cookie', 'theme=dark');
  res.append('Set-Cookie', 'sess_id=12412414');
  res.send('made u a cookie');
  // temporary check for myCookies
console.log('myCookies', req.myCookies);

});


app.post('/', (req, res) => {
  req.session.name = req.body.myName;
  res.redirect('/');
});

//home and redirect
app.get('/', function(req, res) {
    //Check for blacklist on house filter
    
    if(req.query.invite === undefined){
        res.render('index', {name: req.session.name, 'luckyDragons':dragons});
    } else{
        const dragon = dragons.filter(dragon => dragon.house ===req.query.invite); //GET request stored in query
        //create an array with only ones with house filter
        res.render('index', {name: req.session.name, 'luckyDragons':dragon});
    } 
	
});

app.get('/index', function(req, res) {
	res.redirect(302, '/');
});

app.post('/dragon', (req, res) => {
    if(req.session.added === undefined){
        req.session.added = 1;
    } else{
        req.session.added +=1;
    }
    req.session.dragonName = req.body.dragonName;
    req.session.rider = req.body.rider;
    req.session.iden = req.body.iden;
    req.session.house = req.body.house;
    const newDragon = {dragonName:req.body.dragonName,rider:req.body.rider,
        identification:req.body.iden,house:req.body.house};
    dragons.push(newDragon);
    res.redirect('/');
  });

app.get('/dragon', function(req, res) {
    res.render('dragon', {name: req.session.name});
});
app.get('/stats', function(req, res) {
    if(req.session.added === undefined){
        req.session.added = 0;
    }
	res.render('stats', {name: req.session.name,counted:req.session.added});
});

//form and success page
app.get('/post-demo', function(req, res) {
	res.render('post-demo');
});

app.post('/post-demo', function(req, res) {
	res.redirect(303, '/success');
});

app.get('/success', function(req, res) {
	res.render('success');
});

app.listen(3000);
/*
import mongoose from 'mongoose';
import _ from ',.demo.mjs';
import express from 'express';
const app = express();


app.set('view engine', 'hbs');

const Snake = mongoose.model('Snake');

app.post('/snakes', async(req,res) => {
    const s = new Snake({
        name: req.body.snakeName,
        length: req.body.snakeLength
    });
    try {
        const savedSnake = await s.save()
        console.log(savedSnake);
        res.redirect('/snakes');
    } catch(err) {
        res.render(template, {err});
    }
})
app.get('/snakes', (req,res) => {
    Snake.find({},(err, foundSnakes) => {
        res.render('snakes',{snakes: foundSnakes});
    });
});

app.listen(3000);
*/