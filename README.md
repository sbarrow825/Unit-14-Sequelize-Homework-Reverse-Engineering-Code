# Unit 14 Sequelize Homework: Reverse Engineering Code

## Description

Descriptive walkthrough of the code for the attached Node.js express application

## README-Overview

This README contains a table of contents outlining the file structure of this project. Each of the links on the table of contents will bring you to a description of the functionality of that particular file/folder in the application. The descriptions of each file/folder in this README will be high level, meaning that they serve to inform the reader of the broad functionality of that particular file/folder. For more in depth descriptions, please see the comments made within each file as they describe in detail what each line of code is doing.

Note that the first entry in the table of contents is a video walkthough. If you do not wish to read through all the description and comments yourself, you may watch the video where you will be walked through all of the files/folders along with their in-depth, line-by-line descriptions.

Please read the "Application-Overview" section to familarize yourself with this application's functionality before you dive in to the descriptions of specific files and folders.

## Table of Contents

* [Descriptive Walkthough Video](#Walkthough-Video)
* [Usage](#Usage)
* [Installation](#Installation)
* [Application-Overview](#Application-Overview)
* [db directory](#db)
    * [schema.sql](#schema.sql)
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

<br>

## Walkthrough-Video

## Installation

Make sure that you've downloaded [Node.js from the nodejs.org website](https://nodejs.org/en/download/), then run the following command in the working directory of this project to install the necessary node modules

```sh
npm install
```


## Usage

In order to run the application, first copy the db/schema.sql file into your MySQL workbench and generate a "passport_demo" database by hitting the lightning bolt on the top of the window. Note that the /Develop/config/config.json file is specifying that our database has ```"username": "root"``` and ```"password": "password"```. If you are on a MySQL connection that has different username and password parameters, you will need to change config.json accordingly to match your MySQL connection parameters.

Once you've successfully created your database, type the following command into your command line with Develop in your current working directory in order to run the application.

```sh
node server.js
```

After running the above command, you should see a message in your terminal saying ```==> �  Listening on port 8080. Visit http://localhost:8080/ in your browser.``` Open up your browser and navigate to localhost:8080 to use the application.

## Application-Overview

This application uses Passport, an npm module, to manage secure logins of users into the website. Upon opening the application, the user will be sent to a log in page. If the user doesn't have an account, the user will be able to make an account with a specific username and password. If the user already has an account, the user will be able to login from the login page. Upon a successful login, the user will be brought to the members page.

The application uses express-sessions to make sure that each time a user uses the application, that use is saved as a session. This is useful concerning the authentication functionality in this program since once a user logs in, they will continuously be logged in for the remainder of that session (unless they choose to logout with the logout button on the members page).

The application stores all users' emails and password in a MySQL database so that if users have already created an account, they don't need to recreate one in order to log in again. The application also takes security measures to ensure that the users' raw passwords are not stored in the database, but instead a serialized version of their password is stored in the database. This way, the application offers the benefits of persistent login information being stored for users without the drawback of having their passwords stored on a database.

## db

The db directory contains all the files we need to set up our database before running our application.

### schema.sql

schema.sql contains all the code needed to instantiate our database. Since this application uses sequelize to make queries to our database, there is no need to create tables or run a seeds.sql file manually. This file simply creates a database named "passport_demo" if it does not already exists, then uses "passport_demo". 

## server.js

The server.js file sets up a server, making it ready to process client requests and thereby run the app's functionality.

We specify the port that our server will listen on as 
```var PORT = process.env.PORT || 8080```. This allows us to host our server on an external plaform (e.g heroku) if a ```process.env.PORT``` variable exists. If ```process.env.PORT``` does not exist, the server will be hosted on localhost:8080.

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

Middleware is loosely defined as any software or service that enables the parts of a system to communicate and manage data. It is software that handles communication between components and input/output, so developers can focus on the specific purpose of their application.

#### isAuthenticated.js

isAuthenticated.js does exactly what it's name suggests, it checks whether the user is authenticated. Authenticated in this case means that the user has successfully logged in and thus Passport has set a ```req.user``` property.

If isAuthenticated.js is called and the current user is indeed authenticated, it does nothing, it simply tells the client to continue doing whatever it was that they were doing.

If isAuthenticated.js is called and the current user is not authenticated, isAuthenticated.js will redirect the user to the root route ```/```

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

If this app were to be hosted on an external platform, such as heroku, the "production" key of the config.json file would need to be edited to contain a key-value pair of key = use_env_variable and value = the environment variable in order to successfully set up the database.

### passport.js

passport.js deals with authentication when a user tries to sign in. When the user tries to sign in, a function is ran with the inputted "email" and "password" values passed in as parameters. passport.js will then run two authentication checks:

* 1: make sure that there exists a user in the "users" table of the database with a column value of "email" that equals the email the user input
* 2: make sure that the password the user input is a valid password by calling the validPassword method that's defined in the "users" model

If these two checks are passed, passport.js provides a user with the built in "done" function in passport.LocalStrategy.

passport.js also provides the serializeUser and deserializeUser methods needed for using passport sessions. 

## routes

Routes are in essence instructions for the server. They tell the server how to respond to the client when the client makes a request. Without routes, the server would not know how to interprate the requests the client is making and consequently not know how to respond.

The routes in this app are seperated into 2 main categories: api-routes and html-routes. The api-routes deal with telling the server how to serve up data to the client, e.g if the client asks for an entry with a specified id in a database what to send back, while the html-routes deal with redirecting the client and rendering html pages to the client's browser.

### api-routes.js

```
app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
}
```
* Is hit when the client makes a POST request to the URL: ```api/login```
* Calls our passport LocalStrategy function to authenticate the user's login attempt. See [passport.js](#passport.js) for details.
* Responds to the client with the authenticated user if ```passport.authenticate("local")``` was passed
* Responds to the client with a "401 Unauthorized" status if ```passport.authenticate("local")``` failed

<br>

```
app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
});
```

* Is hit when the client makes a POST request to the URL: ```api/signup```
* Uses sequelize to create a new user in the database
* Responds to the client with a 307 temporary redirect code and redirects them to the login page
* Responds to the client with a "401 Unauthorized" status and the error if there was an error

<br>

```
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});
```

* Is hit when the client makes a GET request to the URL: ```/logout```
* Calls the built in Passport function logout(), which removes the req.user property and clears the login session
* Redirects the client to the root route

<br>

```
app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json({}); // don't give the client any information if they're not logged in
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
```
* Is hit when the client makes a GET request to the URL: ```/api/user_data```
* Responds to the client with an empty object if they're not logged in
* Responds to the client with their email and id if they are loggin in

<br>

### html-routes.js

```
app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
```

* Is hit when the client makes a GET request to the root URL: ```/```
* Redirects the client to the members page if they're logged in
* Responds to the client with the singup.html page if they're not logged in

<br>

```
app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
});
```

* Is hit when the client makes a GET request to the URL: ```/login```
* Redirects the client to the members page if they're logged in
* Responds to the client with the login.html page if they're not logged in

<br>

```
app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
});
```

* Is hit when the client makes a GET request to the URL: ```/members```
* Responds to the client with the members.html page if they're logged in
* Redirects the client to the root URL if they're not logged in (see [isAuthenticated.js](#isAuthenticated.js) for details)


## public

The public folder contains files that the server has full access to. Namely, the public folder exists soley so that we can call ```app.use(express.static("public"))``` in the server.js file in order to declare everything inside the public folder as "static" so that the server can have access to them.

### js

The js directory in public contains all the client-side javascript. This is what gives the client functionality on their browser when using the application. All of the on-click event listeners, user inputs, and requests to the server are found in the files within this folder.

#### login.js

login.js deals with all of the client-side functionality on the login page. Namely, login.js handles what happens when the user clicks the login button on the login page. When the login button is clicked, login.js grabs the data that was typed into the "email" and "password" fields, sends a POST request to ```/api/login``` along with an object containing those "email" and "password" values, and finally redirects the user to the members page if the login was successful.

#### members.js

member.js only has one GET request, which makes a request to ```api/user_data``` then sets
the text of the DOM element with class = member-name equal to the email that the server responded with. The allows the client to see their email displayed on the page when they are logged in and on the members page.

#### signup.js

signup.js deals with all of the client-side functionality on the signup page. signup.js sets up on on-submit event listener for the signup form. When the submit button is clicked, signup.js grabs the data that was typed into the "email" and "password" fields, sends a POST request to ```/api/signup``` along with an object containing those "email" and "password" values, and finally redirects the user to the members page if the login was successful.

If the login was not successful, meaning the server responded with an error, the error message is displayed on the screen.

### stylesheets

All files within the stylesheets directory deal with the styling of the application. The colors, size, display, etc... of the html DOM elements are dictated by the files in this directory.

#### style.css

style.css only contains style parameter

```
form.signup,
form.login {
  margin-top: 50px;
}
```

This makes all html elements that are forms with a class of "signup" or "login" have a 50px margin above them.

### login.html

Generates a form on the page for users to input their email and password along with a login button that users can click after inputting their email and password into the form to login.

Also populates the page with a link that will redirect the user to the signup page when clicked.

### members.html

Generates the text "Welcome" plus the user's email to the page.

Also populates the page with a logout button.

### signup.html

Generates a form on the page for users to input their email and password along with a signup button that users can click after inputting their email and password into the form to sign up.

Also populates the page with a link that will redirect the user to the login page when clicked.

<br>

## License

![MIT License](https://img.shields.io/npm/l/inquirer)





## Questions

![Github Profile Picture](https://github.com/sbarrow825.png)

For any questions concerning this project, please feel free to email me at sbarrow825@berkeley.edu

