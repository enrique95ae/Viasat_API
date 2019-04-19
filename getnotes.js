var express =require("express");
var app = express();
var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var gurl = "mongodb://localhost:27017/";
app.use(bodyParser.json())
app.get("/getnotes", (req, res, next) => {
	console.log('body: ', req.body);
	var key=ObjectId(req.body._id);
	MongoClient.connect(gurl,{useNewUrlParser: true }, function(err, db) {
		if (err)
		    throw err;
		var dbo = db.db("entries");
		dbo.collection("entry").find(key).toArray(function(err, result){
			if (err) throw err;
			res.json(result);
			db.close();
		    });
	    });
	
    });
//var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
app.listen(3000,() =>{
	console.log("Server running on port 3000");
	///////////////////////////////
    });
