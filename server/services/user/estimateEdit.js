const User = require('../../models/user');
function estimateEdit(req, res, next) {
  var user;
  var estimateId = req.params.estimateId;
  var id = req.params.id;
  var passTheTest = 0;
  var newEstimate = req.body;
  User.findOne({_id: id}, function(err, user) {
    if (err) {return res.status(500).json({statusMessage: "Internal Error: " + err.message})}
    var x = 0;
    var checkLength = user.estimates.length - 1;
    user.estimates.map(function(data) {
      if(data._id == estimateId) {
        //EDIT
        user.estimates[x] = newEstimate;
        passTheTest = 1;
      }
      x+=1;
      if(x == checkLength && passTheTest == 1) {
        User.findByIdAndUpdate(id, user, {new: true}, function(err2, updatedUser) {
          if (err2) {return res.status(500).json({statusMessage: "Internal Error: " + err2.message})}
          return res.status(200).json({statusMessage: "Completed Editing the Estimate", user: updatedUser})
        })
      }
    });
    if (passTheTest == 0) {
      return res.status(400).json({statusMessage: "Not a Valid Estimate ID"})
    }
  })
}
module.exports = estimateEdit;
