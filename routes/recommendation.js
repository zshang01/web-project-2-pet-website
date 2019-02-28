const express = require("express");
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb+srv://wmsh:W0nbAiMRODGtBWcq@petsitedb-kym1q.mongodb.net/test?retryWrites=true";

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */

router.post("/form", function (req, res) {
	console.log(req.body.user.name);
	console.log(req.body.user.age);
	console.log(req.body.user.childNumber);
	console.log(req.body.user.havePet);

	// compute value here, send information to user according to their input
	let val = 1;
	if (req.body.user.childNumber === "yes"){
		val = 0;
	} else if (req.body.user.childNumber==="no"){
		val = 1;
	} else if (req.body.user.havePet === "yes"){
		val = 2;
	} else if (req.body.user.havePet === "no"){
		val = 3;
	} else {
		val = 4;
	}

	getPet_Information(val, function (docs){
		res.send(docs);
	});
});








function getPet_Information(val, callback){



	// Database name
	const dbName = "pet-website";

	// Create a new MongoClient

	// use connect method to connect to the Server
	mongoClient.connect(url,function(err, client) {
		assert.equal(null, err);

		console.log("Connected successfully to server");

		const db = client.db(dbName);

		const Pet_Information = db.collection("Pet_Information");

		Pet_Information.find({}).toArray(function (err, docs) {
			console.log("Query result");
			assert.equal(null, err);
			console.log("Got docs " + docs.length);

			// val is the value we computed according to user input
			// pick one database entry from docs, depending the value of val

			console.log(val);

			let line=docs[val];  // since we val is index of array of data, make it call line by line
			callback(line);   //later, I need to make the data shows like a table instead of json
			console.log("Closing");
			client.close();
		});
	});
}

module.exports = router;