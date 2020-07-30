'use strict'; //enables "strict mode". With strict mode, you cannot use
// use undecalred variables. Everything must be strictly defined.

var fs        = require('fs'); // requires file system, part of the default npm library
var path      = require('path'); // requires file system, part of the default npm library
var Sequelize = require('sequelize'); // requires sequelize, the npm module used by
// this app to define models and make queries to our database
var basename  = path.basename(module.filename); // the name of this file. Namely, where 
// this index.js file is located.
var env       = process.env.NODE_ENV || 'development'; // states that if a process.env.NODE_ENV
// exists, which would be the case this app was hosted externally on a platform like heroku,
// then set env equal to that process.env.NODE_ENV. Otherwise, set it equal to 'development'.
// which config attributes we select will be dependent on what env is defined as. See ../config/config.json
// for more details
var config    = require(__dirname + '/../config/config.json')[env]; // get the values associated
// with the key "env" in the JSON object located in ../config/config.json.
var db        = {}; // instantiate our database as an empty object

if (config.use_env_variable) { // if we're using an environment variable, e.g this app
// is hosted on heroku not our local machine, do the following "if" condition
  var sequelize = new Sequelize(process.env[config.use_env_variable]); // instantiate a new
  // Sequelize instance using the parameters in "config" under the key of this env variable
} else { // if we are not using an environment variable, e.g we're hosting on our local machine.
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
  // instantiate a new Sequelize instance with the parameters specified in config.json
}

fs
  .readdirSync(__dirname) // reads the entire current directory, namely all files in "models".
  //returns an array of all filenames in the "models" directory.

  .filter(function(file) { // removes all files from the above array that don't meet the
  //following condition

    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    // the filter function makes sure each file passes 3 conditions:
    // 1) the first character of the filename is not ".", meaning that it's not a hidden file
    // 2) the file is not index.js. We don't want to include index.js since it's not a model
    // 3) the last 3 characters of the file are ".js". This specifies that the file is a javascript
    // file. Since our models are contained in javascript files, we make sure the filenames have
    // this ending.
  })
  .forEach(function(file) { // for each of the files that passed through the filter function above
    var model = sequelize['import'](path.join(__dirname, file)); // creates a new sequlize model
    // from the content of each of the files that based the filter function. I.e the files that are
    // defining sequelize models.

    db[model.name] = model; // sets a key value pair in our db object. For each file that defines a
    // model, we set a key-value pair in our db object of key = the model's name (in our case, users)
    // with associated value = the model itself
  });

Object.keys(db).forEach(function(modelName) { // iterate through each key value in our db object
  if (db[modelName].associate) { // if we have an "associate" field in our model
    db[modelName].associate(db); // set up the association. Associations include "hasMany", "belongsTo", etc...
  }
});

db.sequelize = sequelize; // "sequelize" = this sequelize instance. This sets a key of "sequelize"
// in our db object equal to our sequelize instance

db.Sequelize = Sequelize; // "Sequelize" = the npm module sequlize. This declaring that our object "db"
// is a sequelize database and allows it to be synced to our MySQL database.

module.exports = db; // exports our sequlize database "db" for use in other files
