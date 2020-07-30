// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");

// Creating our User model
// a "model" in sequelize represents a table in a database. Here, we are essentially
// defining a "users" table in our database.
module.exports = function(sequelize, DataTypes) { // exports the model for use in other files
  var User = sequelize.define("User", { // defines a new model of name "User"
    // The email cannot be null, and must be a proper email before creation
    email: { // specfiies that this table has a column named "email"
      type: DataTypes.STRING, // specifies that the entries to column "email" must be strings
      allowNull: false, // specifies that the entries to column "email" cannot be null
      unique: true, // specifies that the entries to column "email" must be unqiue. I.e 
      // you can't have two email entries in the same table that are the same.

      validate: { // sequelize syntax for setting up validation parameters
        isEmail: true // built in sequelize validation field. Checks for email
        // syntax by requiring *something*@*something*.com
      }
    },
    // The password cannot be null
    password: { // specifies that this table has a column named "password"
      type: DataTypes.STRING, // specifies that the entries to the column "password" must be strings
      allowNull: false // specifies that the entries to column "password" cannot be null
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) { // defines a new method for our model
    return bcrypt.compareSync(password, this.password); // returns true if the unhashed password entered by the user can be compared to the hashed password stored in our database
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function(user) { //makes sure this step is done before creating the model
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null); // built in bcrypt hash function. Hashes the user's
    // password so that raw passwords are not stored in the database
  });
  return User; // returns the user model
};
