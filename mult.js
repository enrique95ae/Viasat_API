var express =require("express"),
    app = express(),
    Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    ObjectId = require('mongodb').ObjectID,
    bodyParser = require('body-parser'),
    gurl = "mongodb://localhost:27017/";
app.use(bodyParser.json())
app.get("/part", (req, res, next) => {
	console.log('body: ', req.body);
	var query=req.body;//search by all parameters given in 
	MongoClient.connect(gurl,{useNewUrlParser: true }, function(err, db) {
		if (err)
		    throw err;
		var dbo = db.db("mockdb");
		dbo.collection("forms").find(query,{projection:{_id:1,description:1,part_type:1,revision:1}}).toArray(function(err, result) {
			if (err) throw err;
			res.json(result);
			db.close();
		    });
	    });
	
    });
///////
app.get("/searchbyid", (req, res, next) => {
        console.log('Query: ', req.query);
        var key=ObjectId(req.body._id);
        MongoClient.connect(gurl,{useNewUrlParser: true }, function(err, db) {
                if (err)
                    throw err;
                var dbo = db.db("mockdb");
                dbo.collection("forms").find(key).toArray(function(err, result){
			if (err) throw err;
			res.json(result);
			db.close();
		    });
            });
	
    });
///////
var url = "mongodb://localhost:27017/";
app.listen(3000,() =>{
	console.log("Server running on port 3000");
    });