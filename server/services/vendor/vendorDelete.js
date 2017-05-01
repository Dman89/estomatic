const Vendor = require('../../models/vendor');

function vendorDelete(req, res) {
  var id = req.body.vendor;
  var userID = req.body.userId;
  var continueOn = false;
  Vendor.findOne({_id: id})
  .exec(function(err, v) {
    if (err) {return res.status(401).json({statusMessage: "Could not Find Vendor"})}
    admins = v.admins;
    var x = 0;
    admins.map(function(i) {
      x+=1;
      if (i == userID) {
        continueOn = true;
        v.remove(function(err2) {
          if (err2) {return res.status(401).json({statusMessage: "Could not Find Vendor", err: err2.message})}
          return res.status(200).json({statusMessage: "Deleted Vendor"})
        })
      }
      else if (!continueOn && x == admins.length) {
        return res.status(401).json({statusMessage: "Not an Admin"})
      }
    })

  })
}

module.exports = vendorDelete;
