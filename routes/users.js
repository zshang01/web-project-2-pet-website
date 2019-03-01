const express = require("express");
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = process.env.MONGODB_URI || require("./mongoDetails.js");

/*
 Fetching specific user's profile data from mongodb with token passed from website.
 */
router.get("/fetchUser", function(request, response) {
	mongoClient.connect(url, function(error, client) {
		assert.equal(error, null);
		const token = request.query.token;
		const db = client.db("pet-website");
		const tableName = "users-profile";
		db.collection(tableName).findOne(
			{_id: token}, function(error, result) {
				if (error !== undefined && error !== null) {	// occurs error
					response.status(500);
					client.close();
					response.send("Since server encounters error, registration failed. details: " + error.message);
				} else if (result === null) {
					response.status(400);
					client.close();
					response.send("Cannot find user profile with email " + token + ". ");
				} else {
					const petTable = "pets-profile";
					const cursor = db.collection(petTable).find({email: token});
					cursor.map((result1) => {return {
						petName: result1.name,
						petGender: result1.gender,
						petSpecies: result1.species,
						petBreed: result1.breed,
						petAge: result1.age,
						petYears: result1.raisedYears,
						petIntroduction: result1.introduction
					};}).toArray(function(error, res_arr){
						if (error !== undefined && error !== null) {	// occurs error
							response.status(500);
							client.close();
							response.send("Since server encounters error, registration failed. details: " + error.message);
						} else if (res_arr === null) {
							response.status(400);
							client.close();
							response.send("Cannot find user pet information with email " + token + ". ");
						}  else {
							client.close();
							console.log(res_arr);
							response.send({
								email: result._id,
								username: result.username,
								petinfo: res_arr
							});
						}
					});
				}
			});
	});
});

router.post("/register", function(request, response) {
	mongoClient.connect(url, function(error, client) {
		assert.equal(error, null);
		const data = request.body.data;
		const db = client.db("pet-website");
		const tableName = "users-profile";
		db.collection(tableName).findOne(
			{_id: data.email}, function(error, result) {
				if (error !== undefined && error !== null) {	// occurs error
					response.status(500);
					client.close();
					response.send("Since server encounters error, registration failed. details: " + error.message);
				} else if (result !== null) {
					response.status(400);
					client.close();
					response.send("Email " + data.email + " has been occupied. Try another one. ");
				} else {
					db.collection(tableName).insertOne(
						{_id: data.email, username: data.username, password: data.password},
						function(error, result) {
							assert.equal(null, error);
							assert.equal(1, result.insertedCount);
							client.close();
							response.json({"message": "finish"});
						});
				}
			});
	});
});

router.post("/update-profile", function(request, response) {
	mongoClient.connect(url, function(error, client) {
		assert.equal(error, null);
		const data = request.body.data;
		const db = client.db("pet-website");
		const tableName = "users-profile";
		db.collection(tableName).findOneAndUpdate(
			{_id: data.email},
			{$set: {firstName: data.firstName,
					lastName: data.lastName,
					gender: data.gender,
					selfIntroduction: data.selfIntroduction}},
			function(error, result) {
				if (error !== undefined && error !== null) {	// occurs error
					response.status(500);
					client.close();
					response.send("Since server encounters error, updating profile failed. details: " + error.message);
				} else if (result === null) {	// occurs error
					response.status(400);
					client.close();
					response.send("Cannot find user profile with email " + data.email + ". ");
				} else {	// succeeded
					if (data.petInfos.length === 0) {
						client.close();
						response.status(200).send({
							email: data.email,
						});
					} else {
						const petTableName = "pets-profile";
						const petInfos = data.petInfos.map((value) => {
							value["email"] = data.email;
							return value;
						});
						db.collection(petTableName).insertMany(
							petInfos,
							function (error, result) {
								if (error !== undefined && error !== null) {	// occurs error
									response.status(500);
									client.close();
									response.send("Since server encounters error, updating profile failed. details: " + error.message);
								} else if (result === null) {	// occurs error
									response.status(400);
									client.close();
									response.send("Cannot find user profile with email " + data.email + ". ");
								} else {	// succeeded
									client.close();
									response.send({
										email: result._id,
										username: result.username
									});
								}
							});
					}
				}
			});
	});
});

router.post("/authenticate", function(request, response) {
	mongoClient.connect(url, function(error, client) {
		assert.equal(error, null);
		const data = request.body.data;
		const db = client.db("pet-website");
		const tableName = "users-profile";
		db.collection(tableName).findOne({_id: data.email}, function(error, result) {
			if (error !== undefined && error !== null) {	// occurs error
				response.status(500);
				client.close();
				response.send("Since server encounters error, updating profile failed. details: " + error.message);
			} else if (result === null) {	// occurs error
				response.status(200);
				client.close();
				response.send({match: false});
			} else {
				response.status(200);
				client.close();
				response.send({match: true});
			}
		});
	});
});

module.exports = router;
