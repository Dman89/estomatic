const mongoose = require('mongoose');
var config = require("./config");
var user = process.env.DB || config.user;
var password = process.env.DB || config.password;
var DB = process.env.DB || 'mongodb://'+user+':'+password+'@ds161209.mlab.com:61209/ncc-1701-d';
mongoose.connect(DB, function(err) {
  if (err) {
    console.log("Error Connecting");
    console.log(err);
  } else {
    console.log('Connected to MongoDB!')
  }
})
