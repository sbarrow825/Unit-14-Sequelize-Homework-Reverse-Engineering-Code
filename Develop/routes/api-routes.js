// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error

  // app.post lets the server know that we'll run the following function when it
  // receives a request of type "POST" at the url /api/login. This happens when the
  // user hits in the login button on the login page.
  // passport.authenticate("local") is specifying that we're making an authentication
  // request using the "local" strategy. We defined a LocalStrategy for passport over
  // in ../config/passport.js, so that's the strategy we're calling now. If the
  // authentication fails, Passport will respond with a "401 Unauthorized" status.
  // If authentication succeeds, the req.user property will be set to the authenticated user.
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user); // responds to the client with the authenticated user
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error

  // route is hit when the client makes a request of type "POST" to the url /api/signup.
  // this occurs when the client clicks the signup button.
  app.post("/api/signup", function(req, res) {
    db.User.create({ // creates a new user in the database
      email: req.body.email, // "email" column of the new user equals the email field of req.body that the client sent over
      password: req.body.password // "password" column of the new user equals the password field of req.body that the client sent over
    })
      .then(function() {
        res.redirect(307, "/api/login"); // if everything went well, take the client back to the login page
      })
      .catch(function(err) {
        res.status(401).json(err); // if something errored, send the client the error
      });
  });

  // Route for logging user out
  // this route is hit when the client clicks the logout button
  app.get("/logout", function(req, res) {
    req.logout(); //built in Passport function, removes the req.user property and clears the login session
    res.redirect("/"); // redirects the user to the root route
  });

  // Route for getting some data about our user to be used client side
  // this route is hit 
  app.get("/api/user_data", function(req, res) {
    if (!req.user) { // req.user is only set after the user has successfully logged in.
      // req.user is only a truthy value after the user has hit the log in button and
      // successfully passed out Passport local authentication strategy

      // The user is not logged in, send back an empty object
      res.json({}); // don't give the client any information if they're not logged in
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email, // uses the req.user property that Passport made to give
        // the client their email as a response
        id: req.user.id // uses the req.user property that Passport made to give
        // the client their userId as a response
      });
    }
  });
};
