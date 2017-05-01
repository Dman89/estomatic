const Estimate = require('../../models/estimate');
const Price = require('../../models/itemList');
const PriceList = require('../../models/priceList');
module.exports = function(req, res) {
  var id = req.params.id;
  var price = req.body.price;
  if (!id || !price) {
    return res.status(400).json({statusMessage: "Need Item List ID or Estimate ID"})
  }
  Price.findByIdAndUpdate({_id: id})
  .exec(function(e, price) {
    if (e) {return res.status(400).json({statusMessage: "Could not Edit to Estimate"})}
    return res.status(200).json({statusMessage: "Successful", price: price})
  })
}
