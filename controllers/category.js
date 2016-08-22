var express = require('express');
var router = express.Router();
var db = require('../models');

//GET /index home page display all categories
router.get('/',function(req, res) {
  var twitter = '';
      // res.send('render a page of categories here'); -- ROUTE MADE & CONNECTED
  db.category.findAll().then(function(categories){
    res.render('index', {categories: categories});
  }).catch(function(error){
    res.send("categories controller error");
  });

});


//GET a specific category and show all tweets associated
router.get('/:id', function(req, res){
  res.send('render page with tweets associated to a category');
});

module.exports = router;