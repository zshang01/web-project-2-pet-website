const express = require("express");
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";
const dbName = "pet-website";

router.get("/list", function(request, response) {
	mongoClient.connect(url, function(error, client) {
		assert.equal(error, null);
		const db = client.db(dbName);
		const tableName = "articles";
		const cursor = db.collection(tableName).find({}, {limit: 100});
		cursor.map((e) => {return {id: e._id, name: e.name};}).toArray(function(error, result) {
			console.log(result);
			client.close();
			response.send(result);
		});
	});
});

module.exports = router;