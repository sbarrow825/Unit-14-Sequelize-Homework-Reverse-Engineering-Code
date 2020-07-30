// the server.js file sets up a server for you app to run on, meaning
// that your app will be running on a computer ready to process requests
// from a client.

// Requiring necessary npm packages
// this is standard JS syntax for requiring outside modules, e.g express.
// we see that express (along with many other modules) is listed as a dependency
// in the package.json file. We can install all of the dependencies listed in
// the package.json file by running "npm install" in terminal, but in order to
// use those packages in a specific file in our project we need to explicitally
// require them with the below syntax. Here, we are explicitally requiring "express"
// and "express-session" as we will need them later in this file to set up our server
var express = require("express");
var session = require("express-session");

// Requiring passport as we've configured it
var passport = require("./config/passport"); // notice here we are not requiring an
// external module like "express", but instead we are requiring a file. Requiring
// ./config/passport like this allows us access to everything that was exported 
// in the ./config/passport file for use in our server.js file. We can see that at
// the bottom of the ./config/passport file, "module.exports = passport;" is written,
// meaning that the variable "passport" that was defined in ./config/passport is now
// available for use in our current file, server.js.

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080; // The double pipe operators || here indicate a 
// logical "or" statement. This means that, if process.env.PORT is a truthy value, PORT
// will be set equal to process.env.PORT. Otherwise, the double pipe operators will check
// to see if the second value, 8080, is truthy, which it is, and thus would assign the
// variable PORT to the value 8080. Setting up our PORT variable in this way is useful
// because if we did have our app deployed on an external server, say our app was deployed
// on heroku, the process.env.PORT would be a truthy value and our PORT would thus get 
// assigned to the specific process.env.PORT value of where our app is hosted. However, in
// the case where we are not hosting the app on an external service like heroku, we can
// still set up our server on our local machine by setting PORT = 8080 to have the server
// listen on local host 8080.

var db = require("./models"); // notice we are requiring ./models, which
// isn't one specific file but instead an entire directory. requiring the
// entire ./models directory in this way causes us to automatically run the
// file named index.js in the models directory. See ./models/index.js for a
// further explaination on how the models are generated from that index.js file.
// db will be a variable containing all of our sequelize models that we've defined
// in the ./models folder.

// Creating express app and configuring middleware needed for authentication

var app = express(); // since we've required the module "express" up on line 13, we have
// access to the express module's built in methods. The express() method is one of those
// built in express module methods that we now have access to in this server.js file.
// express() creates a new express instance, which is a server instance. We can add
// specifications to that server and eventually call on the "listen" method to have our
// express server start listening for requests on a specified PORT.


app.use(express.urlencoded({ extended: true })); //
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
