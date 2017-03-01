const mongoose = require('mongoose');
var config = process.env.DB || require("./config");
var user = process.env.DB || config.user;
var password = process.env.DB || config.password;
var DB = process.env.DB || 'mongodb://'+user+':'+password+'@ds161209.mlab.com:61209/ncc-1701-d';
var TESTDB = "mongodb://localhost:27017/f";
mongoose.connect(DB, function(err) {
  if (err) {
    console.log("Error Connecting");
    console.log(err);
  } else {
    console.log('Connected to MongoDB!')
  }
})
