const express = require("express");
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const assert = require("assert");


// Connection URL
const url = "mongodb+srv://wmsh:W0nbAiMRODGtBWcq@petsitedb-kym1q.mongodb.net/test?retryWrites=true";
const dbName = "pet-website";

// all path in this router share prefix /articles

router.get("/list", function(request, response) {
	mongoClient.connect(url, function(error, client) {
		assert.equal(error, null);
		const db = client.db(dbName);
		const tableName = "articles";
		const cursor = db.collection(tableName).find({}, {limit: 100});
		cursor.map((e) => {return {id: e._id, name: e.name};}).toArray(function(error, result) {
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

router.post("/add-comment", function(request, response) {
	mongoClient.connect(url, function(error, client) {
		assert.equal(error, null);
		const db = client.db(dbName);
		const tableName = "comments";
		const data = request.body.data;
		db.collection(tableName).insertOne(
			{
				articleId: data.articleId,
				userToken: data.userToken,
				comment: data.comment,
				time: new Date(),
			},
			function(error, result) {
				if (error !== undefined && error !== null) {
					client.close();
					response.status(500);
					response.send("Since server encounters error, add new comment failed. details: " + error.message);
				} else if (result == null) {
					client.close();
					response.status(400);
					response.send("Cannot find add comment for article " + data.articleId);
				} else {
					client.close();
					response.status(200).end();
				}
			});
	});
});

router.get("/get-comments", function(request, response) {
	mongoClient.connect(url, function(error, client) {
		assert.equal(error, null);
		const db = client.db(dbName);
		const tableName = "comments";
		const articleId = request.query.articleId;
		const cursor = db.collection(tableName).find({articleId: articleId}, {limit: 100});
		cursor.sort({time: -1}).map((e) => {
			return {
				id: e._id,
				userToken: e.userToken,
				comment : e.comment,
				time: e.time,
			};
		}).toArray(function(error, result) {
			client.close();
			response.send(result);
		});
	});
});

router.delete("/delete", function (request, response) {
	mongoClient.connect(url, function(error, client) {
		assert.equal(error, null);
		const db = client.db(dbName);
		const articleTable = "articles";
		const articleId = request.query.id;
		db.collection(articleTable).deleteOne({_id: new ObjectID(articleId)}, function(error) {
			if (error !== undefined && error !== null) {
				client.close();
				response.status(500);
				response.send("Since server encounters error, delete article failed. details: " + error.message);
			} else {
				const commentTable = "comments";
				db.collection(commentTable).deleteMany({articleId: articleId}, function(error) {
					if (error !== undefined && error !== null) {
						client.close();
						response.status(500);
						response.send("Since server encounters error, delete article's comments failed. details: " + error.message);
					} else {
						client.close();
						response.status(200).end();
					}
				});
			}
		});
	});
});

router.post("/modify", function(request, response) {
	mongoClient.connect(url, function(error, client) {
		assert.equal(error, null);
		const db = client.db(dbName);
		const table = "articles";
		const data = request.body.data;
		if (data.id === undefined || data.id === null || data.id === "") {	// add new article
			db.collection(table).insertOne({name: data.title, content: data.content, modificationTime: new Date()},
				function(error) {
					if (error !== undefined && error !== null) {
						client.close();
						response.status(500);
						response.send("Since server encounters error, modify article failed. details: " + error.message);
					} else {
						client.close();
						response.status(200).end();
					}
				});
		} else {	// modify article
			db.collection(table).findOneAndUpdate(
				{_id: new ObjectID(data.id)},
				{$set: {name: data.title, content: data.content, modificationTime: new Date()}},
				function(error) {
					if (error !== undefined && error !== null) {
						client.close();
						response.status(500);
						response.send("Since server encounters error, modify article failed. details: " + error.message);
					} else {
						client.close();
						response.status(200).end();
					}
				});
		}
	});
});

module.exports = router;