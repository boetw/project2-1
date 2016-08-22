var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/ppConfig.js');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var request = require('request');
var db = require('./models');
var app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + "/public/"));

app.use(session({
  secret: process.env.SESSION_SECRET || 'abcdefghijklmnopqrstuvwxyz',
  resave: false,
  saveUninitialized: true
}));
//must be right after session
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
  //locals is in ejs object, using middleware to be applicable for all routes
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

//API call
app.get('/', function(req, res) {
  var twitter = 'https://api.twitter.com/1.1/search/tweets.json';

  request(twitter, function(error, response, body) {
    var tweets = JSON.parse(body).results;
    res.render('index', { tweets: tweets });
  });
});

//restrict profile to loggedin people via middleware
app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

app.use('/auth', require('./controllers/auth'));
app.use('/category', require('./controllers/category'));


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
