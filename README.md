# Pet Website

## Description

This is project 2 for Web Development course(CS5610) in Northeastern University, Silicon Valley (Spring 2019 semester). 
Its a simple MERN(Mongo, Express, React, Node) App. In this website, you can get recommendation of your pets, view articles about pets
and register a user account so that you can leave comment on our website. As administrator, you can upload or delete articles from this website.

This project is made by [Fang Hong](https://sososummer88.github.io/) and [Yibo Zhao](http://18.144.2.153:8080/)

## Demo

You can visit our website [here](https://fast-hamlet-93178.herokuapp.com/)

## Feature
+ For users
    * Register and Login
    * Update user profile
    * Get recommendation of pets
    * View articles and leave comments
+ For administrator
    * Add new articles to website
    * Modify articles
    * Delete articles

## Project Structure

| Path | Content |
|------|---------|
| app.js | express server entry point |
| routes/* | routers of backend api which support website communicating with mongodb |
| front/* | all react-related frontend files |
| front/src/css | all css files which are used in react components |
| front/src/pages | all react components |
| front/public | static files|

## Design of MongoDB
We design 5 collections to implement functions.

Collection name: articles

| column | data type | meaning |
|--------|-----------|---------|
| _id | ObjectId | identification of a article |
| name | string | article's name |
| content | string | article's content |
| modificationTime | date| the time when doing the last modification |

Collection name: comments

| column | data type | meaning |
|--------|-----------|---------|
| _id | ObjectId | identification of this comment |
| articleId | string | id of article to which this comment belongs. This field refers to _id in table articles  |
| userToken | string | id of user who write this comment. This field refers to _id in table users-profile | 
| comment | string | content of this comment | 
| time | date | time when user write this comment | 

Collection name: users-profile

| column | data type | meaning |
|--------|-----------|---------|
| _id | string | the email address the user used when register |
| username | string | username |
| password | string | password |
| firstname | string | first name |
| lastname | string | last name |
| gender | string | gender |
| selfintroduction | string | self introduction |

Collection name: pets-profile

| column | data type | meaning |
|--------|-----------|---------|
| _id | string | identification of this pet |
| name | string | name of this pet |
| gender | string | gender of this pet |
| species | string | species |
| breed | string | breed |
| age | int32 | age of this pet |
| raisedYears | int32 | raised years of this pet |
| introduction | string | introduction of this pet |
| email | string | email of this pet's owner. This field refers to _id in table users-profile |

## Technology
During development, we utilized following libs, plugins and frameworks:
+ Nodejs
+ Express
+ MongoDB
+ React
  * react-router
  * react-bootstrap
  * axios

## Install and Run
First, clone this repository and open a terminal to enter the folder 
```shell
git clone https://github.com/beefman92/web-project-2-pet-website.git 
cd web-project-2-pet-website
```
Second, enter front folder and install all related packages
```shell
cd front
npm install
```
Third, go back to root folder and install all related packages
```shell
cd ..
npm install
```
Finally, if you want to run this project for development, do followings commands
```shell
cd front
npm start
# open a new terminal
cd ${this_project_root_directory}
npm start
```
if you want to run this project for publication, do following commands
```shell
cd front
npm run-script build
cd ..
npm start
```

## Course
[CS 5610 - Web Development](http://johnguerra.co/classes/webDevelopment_spring_2019/)
