var passport = require("passport"); // requires the npm module passport
var LocalStrategy = require("passport-local").Strategy; // passport-local
// is a built in Passport strategy for authenticating with a username and
// password.

var db = require("../models"); // requires all of our models. In this case
// there is only 1 model, users, which can be accessed via db.users

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email" 
  },
  function(email, password, done) { // "done" is built in to the passport LocalStrategy.
  // "done" provides a user if all validations are passed
    // When a user tries to sign in this code runs
    db.User.findOne({ // sequelize built in query. Finds a user where the email column
      // input equals the email that the user typed in
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        return done(null, false, { // if no user with email: email was found
          // call "done" with the second parameter being "false", indicating
          // that the validation failed and displaying the message afterwards
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) { // calls the validPassord method that 
        // we defined in our "users" model. If the password is not valid, do the work below
        return done(null, false, { // again, calling "done" with second parameter=false,
        // indicating that the validation failed, and display the failure message
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser); // indicates the validations were passed, and provides a user
    });
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport; // exports passport for use in other files
