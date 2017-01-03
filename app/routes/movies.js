var express = require('express'); //call express library - gives access to bunch of http verbs
var router = express.Router(); //get an instance of the express router
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = ('mongodb://localhost:27017/store');

//server taking care of handling request (req) for data and then returning some information (res)
//passed along variable req - has a params object - any variables that we pass along through the url
//creating a get method
//routing allows to give users access to different types of data, and can pass along information to the routes through the params variable of the request object

// -------------------- GET (READ) - GET ALL MOVIES  -------------------- //

//response to a get request to the /movies route
router.get('/movies', function(req, res) {

    //connecting to the mongodb
    MongoClient.connect(url, function(err, db) {

        //using the movie collection and store it a variable called collection
        var movieCollection = db.collection('movies');

        //find - returns an array of documents from the moviecollection
        movieCollection.find().toArray(function(err, data) {

            //sending back the information as json data
            res.json(data);
            db.close();
        });
    });
});

// -------------------- GET (READ) - GET A MOVIE WITH A SPECIFIC ID  -------------------- //

//response to a get request to the /movies/:id route
router.get('/movies/:id', function(req, res) {

    //connecting to the mongodb
    MongoClient.connect(url, function(err, db) {

        //using the movie collection
        var movieCollection = db.collection('movies');

        //findOne - returns a single document from the moviecollection
        movieCollection.findOne({'_id' : ObjectId(req.params.id)}, function(err, data) {

            res.send(data);
            db.close();
        });
    });
});

// -------------------- POST (CREATE) - CREATE A MOVIE -------------------- //

//response to a post request to the /movies route
router.post('/movies', function(req, res) {

    //connecting to the mongodb
    MongoClient.connect(url, function(err, db) {

        //using the movie collection
        var movieCollection = db.collection('movies');

        //insert - creates a new document in the moviecollection
        movieCollection.insert(req.body, function(err, data) { //req.body - contains key-value pairs of data submitted in the request body.

            res.send({"msg" : "Movie created"});
            db.close();
        });
    });
});


// -------------------- PUT (UPDATE) - UPDATE A MOVIE WITH A SPECIFIC ID  -------------------- //

//response to a put request to the /movies/:id route
router.put('/movies/:id', function(req, res) {

    //connecting to the mongodb
    MongoClient.connect(url, function(err, db) {

        //using the movie collection
        var movieCollection = db.collection('movies');

        delete req.body._id;

        //update - modifies an existing document in the moviecollection
        movieCollection.update({'_id' : ObjectId(req.params.id)}, req.body, function(err, data) {

            //send a message that the movie is updated
            res.send({"msg" : "Movie updated"});
            db.close();
        });
    });
});

// -------------------- DELETE (DELETE) - DELETE A MOVIE WITH A SPECIFIC ID  -------------------- //

//response to a delete request to the /movies/:id route
router.delete('/movies/:id', function(req, res) {

    //connecting to the mongodb and executes a callback function
    MongoClient.connect(url, function(err, db) {

        //using the movie collection
        var movieCollection = db.collection('movies');

        //remove a single document from the moviecollection
        movieCollection.remove({'_id' : ObjectId(req.params.id)}, function(err, data) {

            res.send({"msg" : "Movie deleted"});
            db.close();
        });
    });
});

// -------------------- ROUTING -------------------- //
module.exports = router; //exports the contents of a module

