// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (req.user) { // req.user is only a truthy value if its been set by Passport, which
    // is only true after a user has successfully logged in.
    return next(); // if the user has successfully logged in, let the client continue with
    // whatever it was that they were doing
  }

  // If the user isn't logged in, redirect them to the login page
  return res.redirect("/"); // if the user has not yet successfully logged in, stop whatever
  // it was that the client was doing and redirect them to the root route
};
