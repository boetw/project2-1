var express = require('express');
var router = express.Router();
var passport = require('../config/ppConfig');

var db = require('../models');

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res){
  // res.send(req.body);
  db.user.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created){
    if(created){
      // console.log('User created');
      // res.redirect("/");
      //Notes: authenticate(strategy, redirect object)
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req, res);
    } else {
      req.flash('error','Email already exists');
      res.redirect("/auth/signup");
    }
  }).catch(function(error){
      // console.log("error occurred:", error.message);
      req.flash('error',"error occurred: " + error.message);
      res.redirect("/auth/signup");
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/category',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You are now logged in'
}));

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'Logged out');
  console.log('Logget out');
  res.redirect('/');
});



module.exports = router;
