var express =require("express"),
    app = express(),
    Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectID,
    bodyParser = require('body-parser'),
    gurl = "mongodb://localhost:27017/";
app.use(bodyParser.json())
app.get("/write", (req, res, next) => {
	console.log('body: ', req.body);
	var query=req.body;//search by all parameters given in 
	var searchId=ObjectId(req.body._id);
	//
	var auth=req.body.author;
	var dat=req.body.date;
	var no=req.body.note;
	//
	MongoClient.connect(gurl,{useNewUrlParser: true }, function(err, db) {
		if (err)
		    throw err;
		var dbo = db.db("entries");
		dbo.collection("entry").updateOne({"_id":searchId},{"$push":{"notes":{"author":auth,"date":dat,"note":no}}},function(err, result) {
			if (err) throw err;
			res.json("Entry is noted and will reflect in database.");
			db.close();
		    });
	    });
    });
var url = "mongodb://localhost:27017/";
app.listen(3000,() =>{
	console.log("Server running on port 3000");
    });