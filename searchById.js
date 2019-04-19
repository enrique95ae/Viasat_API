var express =require("express"),
    app = express(),
    Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectID,
    bodyParser = require('body-parser'),
    gurl = "mongodb://localhost:27017/";
app.use(bodyParser.json())
app.get("/search", (req, res, next) => {
	console.log('body: ', req.body);
	var key=ObjectId(req.body._id);
	MongoClient.connect(gurl,{useNewUrlParser: true }, function(err, db) {
		if (err)
		    throw err;
		var dbo = db.db("mockdb");
		dbo.collection("forms").find(key).toArray(function(err, result) {
			if (err) throw err;
			res.json(result);
			db.close();
		    });
	    });
	
    });
var url = "mongodb://localhost:27017/";
app.listen(3000,() =>{
	console.log("Server running on port 3000");
    });
