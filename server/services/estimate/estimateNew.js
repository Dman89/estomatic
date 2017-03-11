const Estimate = require('../../models/estimate');
const User = require('../../models/user');
function estimateNew(req, res, next) {
  var user;
  var id = req.params.id;
  var {name, description, job, address, vendor, priceList, itemList} = req.body.estimate;
  var oldEstimate = req.body.estimate;
  var estimateId, totalCount;
  var totalItems = 0;
  for(var i in oldEstimate) {
    totalItems+=1;
  }
  User.findOne({_id: id}, function(err, user) {
    var checkArray = [];
    if (err) {return res.status(500).json({statusMessage: "Internal Error: " + err.message})}
    const saveEstimate = new Estimate({
      name,
      "date": req.body.estimate.date,
      description,
      job,
      address,
      vendor,
      priceList,
      itemList
    })
    saveEstimate.save(function(err) {
      if (err) {
        return next(err);
      }
      Estimate.find({}, function(err, estimates) {
        var x = 0;
        estimates.map(function(i) {
          x += 1;
          var count = 0;
          var total = 0;
          for (var key in i) {
            var y = 0;
            for (var value in oldEstimate) {
              y += 1;
              count += 1;
              if (value == key) {
                total += 1;
              }
              if (x == estimates.length && count == total) {
                estimateId = i._id;
              }
            }
            count = 0;
          }
          if (x == estimates.length) {
            user.estimates.push(estimateId);
            User.findByIdAndUpdate(id, user, {new: true})
            .populate("estimates")
            .populate("vendor")
            .exec(function(err2, updatedUser) {
              if (err2) {return res.status(500).json({statusMessage: "Internal Error: " + err2.message})}
              //Respond to request indicating the estimate was created
              return res.status(201).json({statusMessage: "Success, Estimate Created!", user: updatedUser, estimateId: estimateId});
            })
          }
        })
      })
    })
  })
}
module.exports = estimateNew;
