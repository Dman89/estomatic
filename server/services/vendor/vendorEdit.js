var Vendor = require('../../models/vendor');

function vendorEdit(req, res) {
  var vendor = req.body.vendor;
  var id = req.body.vendor._id;
  var userID = req.body.userId;
  var continueOn = false;
  var admins;
  var x;
  if (!id) {
    return res.status(401).json({statusMessage: "Double Check the Vendor Object"})
  }
  Vendor.findOne({_id: id}, function(e, v) {
    if (e) {return res.status(401).json({statusMessage: "Not An Vendor Id", err: e.message})}
    else if (v == null) {
      return res.status(400).json({statusMessage: "Vendor needs _id key."})
    }
    else {
      admins = v.admins;
      if (admins.length < 1) {
        return res.status(400).json({statusMessage: "No Admins Saved with Vendor File; Currupt File..."})
      }
      admins.map(function(i) {
        x+=1;
        if (i == userID) {
          continueOn = true;
          Vendor.findByIdAndUpdate(id, vendor, {new: true})
          .exec(function(err, newVendor) {
            if (err) {return res.status(401).json({statusMessage: "Could not Successfully Edited Vendor", err: err.message})}
            return res.status(200).json({statusMessage: "Successfully Edited Vendor", vendor: newVendor})
          })
        }
        else if (!continueOn && x == admins.length) {
          return res.status(401).json({statusMessage: "Not an Admin"})
        }
      })
    }
  })
}

module.exports = vendorEdit;
