const User = require('../../models/user');
function estimateNew(req, res, next) {
  var user;
  var id = req.params.id;
  var estimate = req.body;
  User.findOne({_id: id}, function(err, user) {
    if (err) {return res.status(500).json({statusMessage: "Internal Error: " + err.message})}
    user.estimates.push(estimate);
    User.findByIdAndUpdate(id, user, {new: true}, function(err2, updatedUser) {
      if (err2) {return res.status(500).json({statusMessage: "Internal Error: " + err2.message})}
      return res.status(201).json({statusMessage: "Completed Creating Estimate", user: updatedUser})
    })
  })
}
module.exports = estimateNew;
