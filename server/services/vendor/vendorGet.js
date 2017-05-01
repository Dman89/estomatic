const Vendor = require('../../models/vendor');

function vendorGet(req, res) {
  var id = req.params.id;
  Vendor.findOne({_id: id})
  .exec(function(err, vendor) {
    if (err) {return res.status(401).json({statusMessage: "Could not Find the Vendor"})}
    return res.status(200).json({statusMessage: "Successfully the Vendor", vendor: vendor})
  })
}

module.exports = vendorGet;
