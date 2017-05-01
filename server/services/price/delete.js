const Estimate = require('../../models/estimate');
const Price = require('../../models/itemList');
const PriceList = require('../../models/priceList');
module.exports = function(req, res) {
  var type = req.body.type;
  var id = req.params.id;
  var priceId = req.params.priceId;
  if (!id || !priceId) {
    return res.status(400).json({statusMessage: "Need Item List ID or Estimate ID"})
  }
  Price.findOne({_id: id}, function(err, price) {
    if (err) {return res.status(400).json({statusMessage: "Could not find saved Price"})}
    price.remove(function(e) {
      if (e) {return res.status(400).json({statusMessage: "Could not Save to Estimate"})}
      if (type == "user") {
        Estimate.findOne({_id: id})
        .exec(function(e, esti) {
          if (e) {return res.status(400).json({statusMessage: "Could not Save to Estimate"})}
          Estimate.findByIdAndUpdate(id,
            esti.itemList.filter(function(i){
              return i._id !== priceId;
            }), {new: true})
          .exec(function(e, returnEsti){
            return res.status(200).json({statusMessage: "Successful"})
          })
        })
      }
      //TODO: Vendor Delete of Price
      // if (type == "vendor") {
      //   PriceList.findOne({_id: id})
      //   .exec(function(e, priceList) {
      //     if (e) {return res.status(400).json({statusMessage: "Could not Save to Estimate"})}
      //     return res.status(201).json({statusMessage: "Successful", price: sendPrice, id: sendPrice._id, priceList: priceList})
      //   })
      // }
    })
  })
}
