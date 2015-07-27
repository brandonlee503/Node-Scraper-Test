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

            // Title and year are in the header class so...
            $('.header').filter(function() {
                
                // Store the filtered data in variable for easy viewing
                var data = $(this);

                // In the DOM, the title is in the first child element of the header tag.
                title = data.child.first().text();

                // Store title in JSON object
                json.title = title;

                // In the DOM, the year is the last child element of the header tag.
                year = data.child.last().text();

                // Store year in JSON object
                json.year = year;
            })

            // Rating is in .star-box-giga-star class so...
            $('.star-box-giga-star').filter(function() {
                
                // Store the filtered data in variable for easy viewing
                var data = $(this);
                
                // The .star-box-giga-star class was exactly where we wanted it to be.
                // To get the rating, we can simply just get the .text(), no need to traverse the DOM any further
                rating = data.text();

                // Store rating in JSON object
                json.rating = rating;
            })
        }

    // Write JSON variable to the file system
    // The parameters for this writefile function are (filename, data, callback)
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
        console.log("File sucessfully written");
    })

    // Send message to browser since this app does not have a UI
    res.send("Check your files!");
    
    });
});

// Irrelevent code
/*
console.log("Server initilizes at port 8080");

// Modularlize our code (exporting our functions)
exports = module.exports = app;
*/
