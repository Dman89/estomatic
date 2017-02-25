const mongoose = require('mongoose');
var config = require("./config");
var user = config.user;
var password = config.password;
mongoose.connect('mongodb://'+user+':'+password+'@ds163738.mlab.com:63738/socialnetwork', function(err) {
  if (err) {
    console.log("Error Connecting");
  } else {
    console.log('Connected to MongoDB!')
  }
})
