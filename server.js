// Import dependecies
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

// Initilize express app
var app =  express();

app.get('/scrape', function(req, res){
    // Scraping happens here
};

console.log("Server initilizes at port 8080");

// Modularlize our code (exporting our functions)
exports = module.exports = app;
