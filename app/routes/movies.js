var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = ('mongodb://localhost:27017/store');


// Create Routes for Prodocts

//GET ALL MOVIES
app.get('/movies', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('movies');

        collection.find({}).toArray(function(err, data) {

            res.json(data);
            db.close();
        });
    });
});

//GET A MOVIE WITH A SPECIFIC ID
app.get('/movies/:id', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('movies');

        collection.findOne({'_id' : ObjectId(req.params.id)}, function(err, data) {

            res.send(data);
            db.close();
        });
    });
});

//CREATE A MOVIE
app.post('/movies', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('movies');

        collection.insert(req.body, function(err, data) {

            res.send({"msg" : "Movie created"});
            db.close();
        });
    });
});

// UPDATE MOVIE WITH SPECIFIC ID
app.put('/movies/:id', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('movies');

        delete req.body._id;

        collection.update({'_id' : ObjectId(req.params.id)}, req.body, function(err, data) {

            res.send({"msg" : "Movie updated"});
            db.close();
        });
    });
});

// DELETE MOVIE WITH A SPECIFIC ID
app.delete('/movies/:id', function(req, res) {

    MongoClient.connect(url, function(err, db) {

        var collection = db.collection('movies');

        collection.remove({'_id' : ObjectId(req.params.id)}, function(err, data) {

            res.send({"msg" : "Movie deleted"});
            db.close();
        });
    });
});

module.exports = app;

