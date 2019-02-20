const express = require("express");
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";

/* GET users listing. */
router.get("/", function(req, res) {
	res.json([{
		id: 1,
		username: "samsepi0l"
	}, {
		id: 2,
		username: "D0loresH4ze"
	}]);
});

router.post("/register", function(request, response) {
	mongoClient.connect(url, function(error, client) {
		assert.equal(error, null);
		const data = request.body.data;
		console.log(request.body);
		const db = client.db("pet-website");
		const tableName = "users-profile";
		db.collection(tableName).findOne(
			{_id: data.username}, function(error, result) {
				if (error !== undefined && error !== null) {	// occurs error
					response.status(500);
					client.close();
					response.send("Since server encounters error, registration failed. details: " + error.message);
				} else if (result !== null) {
					response.status(400);
					client.close();
					response.send("Username " + data.username + " has been occupied. Try another one. ");
				} else {
					db.collection(tableName).insertOne(
						{_id: data.username, password: data.password},
						function(error, result) {
							assert.equal(null, error);
							assert.equal(1, result.insertedCount);
							console.log("Insert succeeded. ");
							client.close();
							response.json({"message": "finish"});
						});
				}
			});
	});
});

module.exports = router;
