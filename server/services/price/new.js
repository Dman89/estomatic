const Estimate = require('../../models/estimate');
const Price = require('../../models/itemList');
const PriceList = require('../../models/priceList');
module.exports = function(req, res) {
  var price = req.body.price;
  var type = req.body.type;
  var id = req.params.id;
  var priceId = req.params.priceId;
  if (!id || !priceId) {
    return res.status(400).json({statusMessage: "Need Price ID or Estimate/Vendor ID"})
  }
  var saveThisItemList = Price({
    item: price.item ? "",
    description: price.description ? "",
    unitType: price.unitType ? "",
    quantity: price.quantity ? "",
    UPN: price.UPN ? "",
    unitPriceCurrency: price.unitPriceCurrency ? "",
    unitPrice: price.unitPrice ? "",
    unitId: price.unitId ? "",
    stock: price.stock ? "",
    backorder: price.backorder ? "",
    region: price.region ? "",
    address: price.address ? "",
    "range": price.range ? "",
    "date": new Date()
  })
  saveThisItemList.save(function(err) {
    if (err) {
      return res.status(400).json({statusMessage: "Check to make sure data matches model."})
    }
    Price.findOne({date: saveThisItemList.date}, function(err, sendPrice) {
      if (err) {return res.status(400).json({statusMessage: "Could not find freshly saved Price"})}
      if (type == "user") {
        Estimate.findOne({_id: id})
        .populate("price")
        .populate("priceList")
        .populate("vendor")
        .exec(function(e, esti) {
          if (e) {return res.status(400).json({statusMessage: "Could not Save to Estimate"})}
          return res.status(201).json({statusMessage: "Successful", price: sendPrice, id: sendPrice._id, estimate: esti})
        })
      }
      if (type == "vendor") {
        PriceList.findOne({_id: id})
        .populate("price")
        .exec(function(e, priceList) {
          if (e) {return res.status(400).json({statusMessage: "Could not Save to Estimate"})}
          return res.status(201).json({statusMessage: "Successful", price: sendPrice, id: sendPrice._id, priceList: priceList})
        })
      }
    })
  })
}
