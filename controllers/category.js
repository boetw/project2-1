var express = require('express');
var router = express.Router();
var db = require('../models');

//GET /category page display all categories
router.get('/',function(req, res) {
      // res.send('render a page of categories here'); -- ROUTE MADE & CONNECTED
      res.render('category');


});
//GET category/new to create a new category 
router.get('/new', function(req, res){
  res.send('render page with new category form'); //? won't render the page
  // res.render('new');
});

//POST 
//Purpose: Creates a new category (create) and redirects back to /category
router.post('/new', function(req, res){
  console.log(req.body);
});

//GET /category/:id a specific category and show all tweets associated
router.get('/:id', function(req, res){
  res.send('render page with tweets associated to a category'); //--ROUTE MADE & CONNECTED
  // res.render('');
});

// DELETE A CATEGORY

module.exports = router;