var express = require('express');
var request = require('request');
var Twit = require('twit');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();
var db = require('../models');



var T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    app_only_auth: true
});


//GET *COMPLETE*
//category page display all categories 
router.get('/', isLoggedIn, function(req, res) {
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

//POST *COMPLETE* //Purpose: Receives the name of the category and adds it to database 
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

//GET /category/:name a specific category and show all tweets associated
router.get('/:name', function(req, res) {
    var params = {
        q: req.params.name, //req.query.id
        lang: 'en',
        truncated: false,
        result_type: 'mixed'
    };
    //request to Twitter
    T.get('search/tweets', params, function(err, data, response) {

        var regEx = /(https?:\/\/[^\s]+)/g;
        var statuses = data.statuses;
        // console.log(data.statuses.text); //statuses is an array

        statuses.forEach(function(status){
            status.text = status.text.replace(regEx, '<a href="$1">$1<\/a>');

        });

        res.render('tweets', { statuses: data.statuses, name: params.q });

    }).catch(function(error) {
        res.send(error);
    });
});

// DELETE A CATEGORY
router.delete('/:name', function(req, res) {
    db.category.destroy({
        where: {
            name: req.params.name
        }
    }).then(function() {
        res.send('true');
        // res.redirect('/category');
    });
});

module.exports = router;
