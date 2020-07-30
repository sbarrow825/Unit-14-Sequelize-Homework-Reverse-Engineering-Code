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

## models

### index.js

### user.js

## config

### middleware

#### isAuthenticated.js

### config.json

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

