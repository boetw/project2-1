var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/ppConfig.js');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var request = require('request');
var Twit = require('twit');
var db = require('./models');
var app = express();

app.set('view engine', 'ejs');

var T = new Twit({
    consumer_key:         'process.env.TWITTER_CONSUMER_KEY'
  , consumer_secret:      'process.env.TWITTER_CONSUMER_SECRET'
  , app_only_auth:        true
});

app.use(express.static(__dirname + "/public"));
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

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

app.get('/', function(req, res){
  // console.log('hit root route');
  res.render('index');
});

//restrict profile to loggedin people via middleware
app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});


app.use('/auth', require('./controllers/auth'));
app.use('/category', require('./controllers/category'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
