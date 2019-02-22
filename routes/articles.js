const express = require("express");
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
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

router.get("/get-content", function(request, response) {
	mongoClient.connect(url, function(error, client) {
		assert.equal(error, null);
		const db = client.db(dbName);
		const tableName = "articles";
		const id = request.query.id;
		const mongoId = new ObjectID(id);
		db.collection(tableName).findOne({_id: mongoId}, function (error, result) {
			if (error !== undefined && error !== null) {	// occurs error
				response.status(500);
				client.close();
				response.send("Since server encounters error, registration failed. details: " + error.message);
			} else if (result === null) {
				response.status(400);
				client.close();
				response.send("Cannot find article with id " + id + ". ");
			} else {
				console.log(result);
				client.close();
				response.send({
					id: result._id,
					name: result.name,
					content: result.content,
				});
			}
		});
	});
});

module.exports = router;