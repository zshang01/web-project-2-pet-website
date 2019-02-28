# web-project-2-pet-website

Structure of tables

Table name: articles

| column | data type | meaning |
|--------|-----------|---------|
| _id | ObjectId | identification of a article |
| name | string | article's name |
| content | string | article's content |

Table name: comments

| column | data type | meaning |
|--------|-----------|---------|
| _id | ObjectId | identification of this comment |
| articleId | string | id of article to which this comment belongs. This field refers to _id in table articles  |
| userToken | string | id of user who write this comment. This field refers to _id in table users-profile | 
| comment | string | content of this comment | 
| time | date | time when user write this comment | 

Table name: users-profile

| column | data type | meaning |
|--------|-----------|---------|
| _id | string | the email address the user used when register |
| username | string | username |
| password | string | password |
| firstname | string | first name |
| lastname | string | last name |
| gender | string | gender |
| selfintroduction | string | self introduction |

Table name: pets-profile

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