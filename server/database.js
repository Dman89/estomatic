const mongoose = require('mongoose');
var config = require("./config");
var user = config.user;
var password = config.password;
mongoose.connect('mongodb://'+user+':'+password+'@ds161209.mlab.com:61209/ncc-1701', function(err) {
  if (err) {
    console.log("Error Connecting");
  } else {
    console.log('Connected to MongoDB!')
  }
})
