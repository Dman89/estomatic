const User = require('../../models/user');
const Estimate = require('../../models/estimate');
function estimateEdit(req, res, next) {
  var user;
  var estimateId = req.params.estimateId;
  var id = req.params.id;
  var newEstimate = req.body.estimate;
  User.findOne({_id: id}, function(err, user) {
    if (err) {return res.status(400).json({statusMessage: "Not a Valid Estimate ID", err: err.message})}
    Estimate.findByIdAndUpdate(estimateId, newEstimate, {new: true})
    .populate("estimates")
    .populate("vendor")
    .exec(function(err2, updatedEstimate) {
      if (err2) {return res.status(400).json({statusMessage: "Not a Valid Estimate ID", err: err2.message})}
      return res.status(200).json({statusMessage: "Completed Editing the Estimate", user: user, estimate: updatedEstimate, estimateId: estimateId})
    })
  })
}
module.exports = estimateEdit;
