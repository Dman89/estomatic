const User = require('../../models/user');
const Estimate = require('../../models/estimate');
function estimateDelete(req, res, next) {
  var user;
  var estimateId = req.params.estimateId;
  var id = req.params.id
  User.findOne({_id: id}, function(err, user) {
    if (err) {return res.status(400).json({statusMessage: "Not a Valid User ID", err: err.message})}
    Estimate.findById(estimateId, function(err2, estimate) {
      if (err2) {return res.status(400).json({statusMessage: "Not a Valid Estimate ID", err: err2.message})}
      user = user.estimates.filter(function(data) {
        return data._id !== estimateId;
      });
      User.findByIdAndUpdate(id, user, {new: true})
      .populate("vendor")
      .populate("estimate")
      .exec(function(err3, updatedUser) {
        if (err3) {return res.status(500).json({statusMessage: "Internal Error: " + err3.message})}
        Estimate.remove({_id: estimateId}, function(err4, results) {
          if (err4) {return res.status(500).json({statusMessage: "Internal Error: " + err4.message})}
          return res.status(200).json({statusMessage: "Completed Deleting Estimate", user: updatedUser, results: results})
        })
      })
    })
  })
}
module.exports = estimateDelete;
