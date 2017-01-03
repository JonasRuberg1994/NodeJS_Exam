//call the packages we need
var express = require('express'); //call express
var app = express(); //define our app using express
var cors = require('cors');
var BodyParser = require('body-parser'); // middleware

app.use(BodyParser.urlencoded({extended: true})); //for parsing application/json and store result in req.body
app.use(BodyParser.json()); //for parsing application/x-www-form-urlencoded

app.use(cors());

//movie route - allows our application to use external routes as part of application.
app.use(require('./routes/movies.js'));

//404 - not found error message
app.use(function(req, res){
    res.status(404);
    res.send({"message": "The server received a request for a page that it couldn’t find"})
});


//listens on port 3000 for connections
var server = app.listen(3000, function () {
    console.log("listening on port 3000");
});