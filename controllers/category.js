var express = require('express');
var request = require('request');
var Twit = require('twit');
var router = express.Router();
var db = require('../models');



var T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    app_only_auth: true
});

const util = require('util');

//GET *COMPLETE*
//category page display all categories 
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
router.post('/new', function(req, res) {
    db.category.create({
        name: req.body.name
    }).then(function(category) {
        console.log(req.body);
        res.redirect('/category');
    }).catch(function(error) {
        res.send('Category is not found');
    })
})


//GET /category/:id a specific category and show all tweets associated
router.get('/:name', function(req, res) {
    // res.send('render page with tweets associated to a category'); //--ROUTE MADE & CONNECTED
    var params = {
        q: req.params.name, //req.query.id
        count: 10,
        lang: 'en',
        result_type: 'mixed'
    };
//request to Twitter
    T.get('search/tweets', params, function(err, data, response) {
        //var parsedData = JSON.parse(data);
        // console.log(data.statuses[0].user)
            //console.log(util.inspect(data));
            // var statuses = JSON.parse(data);
      console.log(data);
      res.render('tweets', {statuses: data.statuses});

        // db.category.find({
        //     where: { id: req.params.name },
        // }).then(function(statuses) {
        //     res.render('tweets', { statuses: statuses });
        // }).catch(function(error){
        //   res.send(error);
        // });
    }).catch(function(error){
      res.send(error);
    });
});



//go into statuses loop through statuses array and 

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
