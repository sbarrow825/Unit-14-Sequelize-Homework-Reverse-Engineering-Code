// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) { // req.user is only a truthy value if the user has succesfully
      // logged in, in which case, bring them to the members page
      res.redirect("/members"); // redirects the client's page to the /members url
    }
    res.sendFile(path.join(__dirname, "../public/signup.html")); // the server will
    // only send this response if we have not yet sent the response on line 13. Thus,
    // this response will only be sent to the client if they haven't logged in, in which
    // case, send them the html of the signup page to prompt them to sign up.
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {// req.user is only a truthy value if the user has succesfully
      // logged in, in which case, bring them to the members page
      res.redirect("/members");// redirects the client's page to the /members url
    }
    res.sendFile(path.join(__dirname, "../public/login.html")); // the server will
    // only send this response if we have not yet sent the response on line 25. Thus,
    // this response will only be sent to the client if they haven't logged in, in which
    // case, send them the html of the signup page to prompt them to try logging in again.
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) { // isAuthenticated simply checks to see if
    // a req.user field exists, i.e if the user is logged in. If the user is logged in, send them to the members page.
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

};
