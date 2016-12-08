var express = require('express');
var app = express(); //create the app
var cors = require('cors');

var BodyParser = require('body-parser'); // middle
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());

app.use(cors());

//Route - Movies
var movies = require('./routes/movies.js');
app.use(movies);


//Listening on port 3000
var server = app.listen(3000, function () {
    console.log("listening on port 3000");
});