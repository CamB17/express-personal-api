var mongoose = require('mongoose');

mongoose.connect( process.env.MONGODB_URI || 
                  process.env.MONGOLAB_URI || 
                  process.env.MONGOHQ_URL || 
                  'mongodb://localhost/personal-api');

module.exports.Profile = require("./profile.js");
//module.exports.Pets = require("./pets.js");
//module.exports.Movies = require("./movies.js");