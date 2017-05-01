const Vendor = require('../../models/vendor');

function vendorNew(req, res) {
  var vendor = req.body.vendor;
  if (!vendor.admins[0]) {
    return res.status(400).json({statusMessage: "Include Admin Id"})
  }
  var newVendor = new Vendor({
    admins: vendor.admins,
    name: vendor.name,
    address: vendor.address,
    "range": vendor.range,
    region: vendor.region,
    priceList: vendor.priceList ? vendor.priceList: [],
    oldPriceLists: vendor.oldPriceLists ? vendor.oldPriceLists: [],
    TIME: new Date()
  })
  newVendor.save(function(err) {
    if (err) {return res.status(404).json({statusMessage: err.message})}
    Vendor.findOne({TIME: newVendor.TIME})
    .exec(function(err2, vendor) {
      if (err2) {return res.status(404).json({statusMessage: err2.message})}
      return res.status(201).json({statusMessage: "Created User", vendor: vendor, id: vendor._id})
    })
  })
}

module.exports = vendorNew;
