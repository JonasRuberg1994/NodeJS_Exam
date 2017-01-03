//call the packages we need
var express = require('express'); //call express
var app = express(); //define our app using express
var cors = require('cors');
var BodyParser = require('body-parser'); // middleware

app.use(BodyParser.urlencoded({extended: true})); //for parsing application/json
app.use(BodyParser.json()); //for parsing application/x-www-form-urlencoded

app.use(cors());

//importing the movie route
app.use(require('./routes/movies.js'));

//404 - not found error message
app.use(function(req, res){
    res.status(404);
    res.send({"message": "The server does not know the request you tried to make(404)"})
});


//Listening on port 3000
var server = app.listen(3000, function () {
    console.log("listening on port 3000");
});