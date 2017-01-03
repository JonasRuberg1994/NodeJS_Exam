var express = require('express'); //call express library - gives access to bunch of http verbs
var router = express.Router(); //get an instance of the express router
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = ('mongodb://localhost:27017/store');

// -------------------- GET (READ) - GET ALL MOVIES  -------------------- //

//response to a get request to the /movies route
router.get('/movies', function(req, res) {

    //connecting to the mongodb
    MongoClient.connect(url, function(err, db) {

        if (err) {
            res.status(500); //external server error.
        }

        //using the movie collection
        var movieCollection = db.collection('movies');

        //find - returns an array of movies
        movieCollection.find().toArray(function(err, movies) {

            //response with an error if there is any
            if (err)
            {
                res.send(err);
            }

            //response with json format
            res.json(movies);
        });

        db.close();
    });
});

// -------------------- GET (READ) - GET A MOVIE WITH A SPECIFIC ID  -------------------- //

//response to a get request to the /movies/:id route
router.get('/movies/:id', function(req, res) {

    //connecting to the mongodb and executes a callback function when connected
    MongoClient.connect(url, function(err, db) {

        //using the movie collection
        var movieCollection = db.collection('movies');

        //return single movie - matches the ObjectId from mongodb to the id passed in the url
        movieCollection.findOne({'_id' : ObjectId(req.params.id)}, function(err, movie) {

            //response with an error if there is any
            if (err)
            {
                res.send(err);
            }

            //response with json format
            res.json(movie);
        });

        //close the connection
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

        //update single movie - matches the ObjectId from mongodb to the id passed in the url
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

        //remove single movie - matches the ObjectId from mongodb to the id passed in the url
        movieCollection.remove({'_id' : ObjectId(req.params.id)}, function(err, movie) {

            //response with an error if there is any
            if (err)
            {
                res.send(err);
            }

            //response with json format
            res.json({"message": "movie deleted"});
        });

        db.close();
    });
});

// -------------------- ROUTING -------------------- //
module.exports = router; //exports the contents of a module

