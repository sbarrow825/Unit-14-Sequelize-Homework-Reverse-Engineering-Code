Reverse engineer the starter code provided and create a tutorial for the code.

In the `Develop` folder, there is starter code for a project. Begin inspecting the code to get an understanding of each file's responsibility. Then, README markdown file, write a tutorial explaining *every* file and its purpose in as fine as detail as possible. If one file is dependant on other files, be sure to let the user know.

At the end of the tutorial, add instructions for how you could now add changes to this project.

Following the [common templates for user stories](https://en.wikipedia.org/wiki/User_story#Common_templates), we can frame this challenge as follows:

```
AS A developer

I WANT a walk-through of the codebase

SO THAT I can use it as a starting point for a new project
```

## Business Context

When joining a new team, you will be expected to inspect a lot of code that you have never seen before. Rather than having a team member explain every line for you, you will dissect the code by yourself, saving any questions for a member of your team.

## Acceptance Criteria

```md
GIVEN a Node.js application using Sequelize and Passport
WHEN I follow the walkthrough
THEN I understand the codebase
```
- - -

## Submission on BCS

You are required to submit the following:

* A link to code repo that contains the code within the `Develop` directory. The repo should contain a tutorial written in markdown explaining how the application functions; a tutorial.

* The `Develop` directory should be updated with original comments on what the code is doing line-by-line. 

* Optionally - you may also include a video explaining the application in `Develop` directory and display that video in the README Doc. 

* Both the video and the written tutorial should include visual graphics to support your lesson. 

`Note`: With both cases, written tutorial and/or video tutorial:

* line-by-line commenting is expected within the code. 
* A formatted README that list a written introduction of the purpose of the application and a high level explanation of how it works. 

* **Detailed** explanation of how the application functions can be expressed in a **Video** **OR** a **Written Tutorial**

- - -
© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.







































# Unit 14 Sequelize Homework: Reverse Engineering Code

## Description

Descriptive walkthrough of the functionality and code syntax in the attached Node express app

## README-Overview

This README contains a table of contents outlining the file structure of this project. Each of the links on the table of contents will bring you to a description of the functionality of that particular file/folder in the application. The descriptions of each file/folder in this README will be high level, meaning that they serve to inform the reader of the broad functionality of that particular file/folder. For more in depth descriptions, please see the comments made within each file as they describe pretty much what each and ever line of code in doing.

Note that the first entry in the table of contents brings you to a video walkthough. If you do not wish to read through all the description and comments yourself, you may watch the video where you will be walked through all of the files/folders along with their in-depth, line-by-line descriptions.

Please read the "Application-Overview" section to begin with to familarize yourself with this app's functionality before you dive in to the descriptions of specific files and folders.

## Table of Contents

* [Descriptive Walkthough Video](#Walkthough-Video)
* [Usage](#Usage)
* [Application-Overview](#Application-Overview)
* [server.js](#server.js)
* [package.json](#package.json)
* [models directory](#models)
    * [index.js](#index.js)
    * [user.js](#user.js)
* [config directory](#config)
    * [middleware directory](#middleware)
        * [isAuthenticated.js](#isAuthenticated.js)
    * [config.json](#config.json)
    * [passport.js](#passport.js)
* [routes directory](#routes)
    * [api-routes.js](#api-routes.js)
    * [html-routes.js](#html-routes.js)
* [public directory](#public)
    * [js directory](#js)
        * [login.js](#login.js)
        * [members.js](#members.js)
        * [signup.js](#signup.js)
    * [stylesheets directory](#stylesheets)
        * [style.css](#style.css)
    * [login.html](#login.html)
    * [members.html](#members.html)
    * [signup.html](#signup.html)
* [License](#License)
* [Questions](#Questions)

## Walkthrough-Video

## Usage


## Application-Overview

## server.js

The server.js file sets up a server, making it ready to process client requests and thereby run the app's functionality.

We specify the port that our server will listen on as ```var PORT = process.env.PORT || 8080```. This allows us to host our server on an external plaform (e.g heroku) if a ```process.env.PORT``` variable exists. If ```process.env.PORT``` does not exist, the server will be hosted on localhost:8080.

All of our sequelize models are required in our server.js file ```var db = require("./models")``` such that we can later sync() up our sequelize model with our database in order for the server to use sequelize to make changes to the database. See [models directory](#models) for more information on how these models are generated.

This Node.js app runs on express. In order to configure our application, we first start by declaring a variable (in this case "app") equal to a new express instance ```var app = express()```.

Options are then specified for the app allowing it to parse incoming requests from forms ```(app.use(express.urlencoded))``` and requests containing JSON objects ```app.use(express.json())```.

The app is then told that everything inside the "public" directory is static ```app.use(express.static(public))```, meaning that is has access to the information contained in all of the files in the public directory at any time.

The app is then configured to handle sessions using express-sessions ```app.use(session(...))```. This configures the app such that each time a client uses the app, that usage will be saved as a particular sesssion.

The app is then configured to use the Passport authentication module ```app.use(passport.initialize())``` for sessions ```app.use(passort.session())``` allowing Passport to automatically alter the req object and change the "user" value that is current the session id into the deseriazlied user object.

All of the routes in the "routes" folder are then required ```require("./routes/html-routes.js")(app)``` ```require("./routes/api-routes.js")(app)``` by our app such that the server knows how to respond to the client when it recieves a request at any one of these routes.

Our sequelize models are then synced up to our "passport_demo" MySQL database ```db.sequelize.sync()``` allowing the server to make changes to our "passport_demo" database using sequelize.

Finally, our app starts listening for client requests on our specified PORT ```app.listen(PORT, function() {``` and console.logs the PORT that the server is now listening on ```console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);```

## package.json

All npm packages contain a file, usually in the project root as it is here, call ```package.json```. This file hold various metadata relevant to the project.

The important part of the ```package.json``` file that we care about in regard to the functionality of this app is the ```dependencies```. For this app, the dependencies are as follows:

```"dependencies": {
    "bcryptjs": "2.4.3",
    "express": "^4.17.0",
    "express-session": "^1.16.1",
    "mysql2": "^1.6.5",
    "passport": "^0.4.0",
    "passport-local": "^1.0.0",
    "sequelize": "^5.8.6"
}
```

All of the entries inside ```dependencies``` specifiy which npm packages this app needs to have installed before it can function.

All of these dependencies in the ```package.json``` file are installed upon running ```npm install``` in your terminal with the ```package.json``` file in your root directory:

## models

This Node.js application uses sequelize. Sequelize is an npm module and an ORM (Object-Relational-Mapper) used for making database queries. This application uses sequelize to make queries to the "passport_demo" database.

In sequelize, we must first define "models" and sync those model up to a database before we can make queries. A "model" in sequelize represents a table in a database, and these directory contains all of the sequlize models used in this application.

### index.js

index.js is a unique file in the models folder. In any Node.js app using sequelize for database queries, index.js will be the only js file in the models directory that is not itself a sequlize model. Instead, index.js is responsible for creating all models from the other files in the models directory, adding those to a database object, and exporting the database object for the server to sync with the actual database.

when the models directory is required in another file, as it is in server.js, the index.js file in the models directory is automatically run.

index.js does all the work in setting up the database to be ready for making sequelize queries, with the exception of syncing. index.js relies on the config.json file in the config directory for values when setting up the database. See [config.json](#config.json) for more details.

### user.js

user.js is a sequlize model. A sequelize model represents a table in a database.

We define the "users" model in user.js with ```sequelize.define("User, ...```. Note the sequlize automatically pluralizes and lowercases model names, so "User" gets converted to "users".

Columns in the "users" model are defined inside the ```sequelize.define(...)``` function with the following syntax:

```
columnName: {
    type: DataType,
    otherParameters: otherValues
}
```
In our case, the "email" column in the "users" model is defined as such:

```
email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true
    }
}
```

We also create a custom method in our "users" model to validate the "password" column input

```
User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
```

which makes sure that the raw password that the user inputted can be uniquely compared to a hashed password generated by bcryptjs, an npm module used for password hashing.

If the hash can be uniquely compared, the "password" column input is set as the hashed password instead of the raw password with the following hook:

```
User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
});
```

## config

The config folder contains files that deal with configuration of the application. This includes both configuring of the database as well as authentication with the npm module "Passport"

### middleware

#### isAuthenticated.js

### config.json

The config.json file works in tandem with the [index.js](#index.js) in the models directory to succesfully set up the database for allowing the server to successfully make queries to using sequelize.

config.json is gives index.js the values needed for index.js to create a new Sequelize instance with the proper database name, username, and password. For example, when running the application on localhost, the "development" values of the config.json file shown below are used by index.js to set up the sequelize database to refer to the database hosted on your local machine.

```
"development": {
    "username": "root",
    "password": "password",
    "database": "passport_demo",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
```

If you have a MySQL database named "passport_demo" being used on a connection with username "root" that has password "password", index.js will successfully set up the connenction to that database.

### passport.js

## routes

### api-routes.js

### html-routes.js

## public

### js

#### login.js

#### members.js

#### signup.js

### stylesheets

#### style.css

### login.html

### members.html

### signup.html

## License

![MIT License](https://img.shields.io/npm/l/inquirer)





## Questions

![Github Profile Picture](https://github.com/sbarrow825.png)

For any questions concerning this project, please feel free to email me at sbarrow825@berkeley.edu

