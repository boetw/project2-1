var express = require('express');
var request = require('request');
var router = express.Router();
var db = require('../models');

//GET /category page display all categories *COMPLETE*
router.get('/', function(req, res) {
    // res.send('render a page of categories here'); -- ROUTE MADE & CONNECTED

    db.category.findAll().then(function(categories) {
        res.render('category', { categories: categories });
    }).catch(function(error) {
        res.send(error);
    });

});

//GET * COMPLETE *
// category/new display form for creating a new category  *COMPLETE*
router.get('/new', function(req, res) {
    // res.send('render page with new category form'); // ROUTE MADE & CONNECTED
    res.render('new');
});

//POST *COMPLETE*
//Purpose: Receives the name of the category and adds it to database 
router.post('/new', function(req, res){
  db.category.create({
    name: req.body.name
  }).then(function(category){
    console.log(req.body);
    res.redirect('/category');
  }).catch(function(error){
    res.send('Category is not found');
  })
})


//GET /category/:id a specific category and show all tweets associated
router.get('/:id', function(req, res) {
    // res.send('render page with tweets associated to a category'); //--ROUTE MADE & CONNECTED
    request({
        url: 'https://api.twitter.com/1.1/search/tweets.json',
        method: "GET",
        qs: {
            q: req.query.id
        }
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var dataObj = JSON.parse(body);
            res.render("category", { results: dataObj.Search });
        }
    });
});



// DELETE A CATEGORY

router.post('/delete', function(req, res) {
    db.category.destroy({
        where: {
            categoryName: req.body.name
        }
    }).then(function(category) {
        res.redirect('/category');
    });
});

module.exports = router;
