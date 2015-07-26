// Import dependecies
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

// Initilize express app
var app =  express();

// Scraping happens here - Routes HTTP GET requests to the specified path with the specified callback functions.
app.get('/scrape', function(req, res){
    
    // The URL we'll be scraping from
    url = 'http://www.imdb.com/title/tt1229340/';
    
    // Request call structure - Parameter 1 = Our URL
    // Parameter 2 - callback function with 3 parameters
    request(url, function(error, response, html){
        
        // First check if there's any errors
        if (!error) {
            
            // Next utilize cheerio to give us jQuery functionality on returned HTML
            var $ = cheerio.load(html);

            // Define the variables we want to capture
            var title, release, rating;
            var json = {title: "", release: "", rating: ""};
        }
    })
};

console.log("Server initilizes at port 8080");

// Modularlize our code (exporting our functions)
exports = module.exports = app;

