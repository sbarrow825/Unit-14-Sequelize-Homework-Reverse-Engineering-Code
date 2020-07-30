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


app.use(express.urlencoded({ extended: true })); // built in express method that allows our
// app to parse incoming requests with urlencoded payloads. This means that when the client
// sends our server a request via a form, our server will create a new body object from the
// request that can be accessed via req.body, or an empty object if there was no body to parse.
// The "extended: true" property specification here tells our server that the value of the key-value
// pairs in req.body can be any datatype. If instead we passed in "extended: false", the values
// to the key-value pairs in req.body could only be datatypes of either String or Array.

app.use(express.json()); // similar to the above command, this command deals with allowing our
// server to parse data. Here, we are telling our server that if client sends over a request
// with a JSON object, parse that JSON object into a req.body object so that we can have access
// to the information that was contained in that JSON object on the server side.

app.use(express.static("public")); // in computer science, the word "static" means that a variable
// has been allocated "statically", specifying that its lifetime is the entire run of the program.
// Basically, declaring something as static means that everything else in the program has access to
// that variable at any time. The express.static() method takes in a "root" parameter, specifying
// the root directory from which to serve static assets. Here, we are passing in "public" as our 
// "root" parameter to the express.static() method, meaning that everything inside of the "public"
// directly is now declared static, and is now available for any other file anywhere else in the
// application to use at any time.

// We need to use sessions to keep track of our user's login status

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true })); // session is
// a built in method in the express-sessions module. Calling app.use(session(...)) like we've done
// here makes it so that each time a client uses that app, that use is saved on the server side as
// a particular "session". This is very useful for apps since it allows the server to save data for
// a client's particular session, while not saving that data globally on the app for other clients.
// For example: if you had an app that allowed clients to add ToDo tasks to the page, you wouldn't
// want one client to save their ToDos on the page then have another client open up your app and see
// the first client's ToDos populate their page. You would want both clients to be running the app
// on their own session so that you don't get this overlap.
// 
// The "secret" option is the only required option for a session. The string stored as the value to
// the key secret is used to sign the session ID cookie. This means that when the client opens the
// app, this "secret" value is used to confirm the client access to this particular session. Without
// a "secret" string, access to the session would essentially be denied. It's a good practice to use
// a secret string that cannot be easily guessed by humans in order to reduce the ability of others
// hijacking the session. It's also good practice to set the session key equal to something such as
// an environment variable such that the secret itself doesn't exist on your repository for others
// to see. We've done neither of those things here.
//
// The "resave: true" option tells the session store that a particular session is still active. This
// can be useful since some stores will delete unused sessions after some time.
//
// The "saveUninitialized: true" option forces a session to be saved to the store even when it is
// uninitialized. This means that whenever the client opens up a session, even if they change nothing
// (aka haven't initialized the session), that session will be saved back to the session store.


app.use(passport.initialize()); // initializes the "Passport" authentication module on our app. This
// module will take care of securely logging users into the app.

app.use(passport.session()); // since our application uses persistent login sessions, we must include
// this passport.session() method. This allows passport to automatically alter the req object
// and change the "user" value that is currently the session id into the true, deserialized user object.
// Passport can only successfully do this if serializeUser and deserializeUser methods are provided,
// which they are in ./config/passport.js. See that file for more details.

// Requiring our routes

require("./routes/html-routes.js")(app); // allows the server to successfully respond to the client
// when any of the routes defined in the file ./routes/html-routes.js are hit.
require("./routes/api-routes.js")(app); // allows the server to successfully respond to the client
// when any of the routes defined in the file ./routes/api-routes.js are hit.
// See the comments in these two files for more details on how the server responds to these routes.

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() { //syncs all of our sequelize models with our "passport_demo"
// MySQL database. This allows use to then use sequelize to make changes to the database. Notice
// that we have ommitted the "force: true" option inside the .sync() method, this means that if the
// database already has data in it, we do not get rid of the old data every time we sync, we simply
// get ready to modify the existing data.
  app.listen(PORT, function() { // tells our express app to start listening for requests from the client
    // on the specified PORT. After this call, our server is up and ready to process client requests.
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    // displays a message in terminal informing the user that the server is now up and which PORT it is
    // listening for requests on.
  });
});
