var express = require('express'); //call express library - gives access to bunch of http verbs
var router = express.Router(); //get an instance of the express router
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = ('mongodb://localhost:27017/store');

//server taking care of handling request (req) for data and then returning some information (res)
//passed along variable req - has a params object - any variables that we pass along through the url
//creating a get method
//routing allows to give users access to different types of data, and can pass along information to the routes through the params variable of the request object

//findOne - returns a single document from the moviecollection
//req.params.id - this property is an object containing properties mapped to the route parameters
//where _id is equal to ObjectId - since it is stored in database we required object id in the top
//req.params.id - pass in the id that is passed in the url

// -------------------- GET (READ) - GET ALL MOVIES  -------------------- //

//response to a get request to the /movies route
router.get('/movies', function(req, res) {

    //connecting to the mongodb
    MongoClient.connect(url, function(err, db) {

        //status code 500 - external server error.
        if (err) {
            res.status(500);
        }

        //using the movie collection
        var movieCollection = db.collection('movies');

        //find - returns an array of documents from the moviecollection
        movieCollection.find().toArray(function(err, movies) {

            //response with an error if there is any
            if (err)
            {
                res.send(err);
            }

            //else response with json format
            res.json(movies);
        });

        db.close();
    });
});

// -------------------- GET (READ) - GET A MOVIE WITH A SPECIFIC ID  -------------------- //

//response to a get request to the /movies/:id route
router.get('/movies/:id', function(req, res) {

    //connecting to the mongodb
    MongoClient.connect(url, function(err, db) {

        //using the movie collection
        var movieCollection = db.collection('movies');

        //matches the objectId with the id passed in the url
        //return single movie where _id is equal to ObjectId from mongodb and pass in the id that is passed in the url
        movieCollection.findOne({'_id' : ObjectId(req.params.id)}, function(err, movie) {

            //response with an error if there is any
            if (err)
            {
                res.send(err);
            }

            //response with json format
            res.json(movie);
        });

        db.close();
    });
});

// -------------------- POST (CREATE) - CREATE A MOVIE -------------------- //

//response to a post request to the /movies route
router.post('/movies', function(req, res) {

    //connecting to the mongodb
    MongoClient.connect(url, function(err, db) {

        //using the movie collection
        var movieCollection = db.collection('movies');

        //req.body - contains key-value pairs of data submitted in form.
        var movie = req.body;

        movieCollection.insert(movie, function(err, movie) {

            //response with an error if there is any
            if (err)
            {
                res.send(err);
            }

            //response with json format
            res.json({"message": "movie created"});
        });

        db.close();
    });
});


// -------------------- PUT (UPDATE) - UPDATE A MOVIE WITH A SPECIFIC ID  -------------------- //

//response to a put request to the /movies/:id route
router.put('/movies/:id', function(req, res) {

    //connecting to the mongodb
    MongoClient.connect(url, function(err, db) {

        //using the movie collection
        var movieCollection = db.collection('movies');

        //so it updates correctly
        delete req.body._id;

        //req.body - contains key-value pairs of data submitted in the form.
        var movie = req.body;

        //update single movie where _id is equal to ObjectId from mongodb and pass in the id that is passed in the url
        movieCollection.update({'_id' : ObjectId(req.params.id)}, movie, function(err, movie) {

            //response with an error if there is any
            if (err)
            {
                res.send(err);
            }

            //response with json format
            res.json({"message": "movie updated"});
        });

        db.close();
    });
});

// -------------------- DELETE (DELETE) - DELETE A MOVIE WITH A SPECIFIC ID  -------------------- //

//response to a delete request to the /movies/:id route
router.delete('/movies/:id', function(req, res) {

    //connecting to the mongodb and executes a callback function
    MongoClient.connect(url, function(err, db) {

        //using the movie collection
        var movieCollection = db.collection('movies');

        //remove single movie where _id is equal to ObjectId from mongodb and pass in the id that is passed in the url
        movieCollection.remove({'_id' : ObjectId(req.params.id)}, function(err, movie) {

            //response with an error if there is any
            if (err)
            {
                res.send(err);
            }

            //response with json format
            res.json({"message": "movie deleted"});

            db.close();
        });
    });
});

// -------------------- ROUTING -------------------- //
module.exports = router; //exports the contents of a module

