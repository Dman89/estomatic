const Vendor = require('../../models/vendor');

function vendorsGet(req, res) {
  Vendor.find({})
  .exec(function(err, vendors) {
    if (err) {return res.status(401).json({statusMessage: "Could not Find a List of Vendors"})}
    return res.status(200).json({statusMessage: "Successfully Found a List of Vendors", vendors: vendors})
  })
}

module.exports = vendorsGet;
