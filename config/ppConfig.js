var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

//serializing user object into usable id
passport.serializeUser(function(user, cb){
  cb(null, user.id);
});

//(deserialize... id from serialize)
passport.deserializeUser(function(id, cb){
  db.user.findById(id).then(function(user){
    cb(null, user);
  }).catch(cb);
});

//utlize local strategy by initializing new constructor object
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, cb){
  //when we want to log someone in
  db.user.find({
    where: {email: email}
  }).then(function(user){
    //not user, not a valid password
    if(!user || !user.validPassword(password)){
      cb(null, false);
    } else {
      cb(null, user);
    }
  }).catch(cb);
}));

//make accessible 
module.exports = passport;