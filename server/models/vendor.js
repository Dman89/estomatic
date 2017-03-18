const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Price = require('./price');

//Define, Create, Export

const Vendor = new Schema({
  name: String,
  address: String,
  "range": String,
  region: String,
  priceList: [{type: mongoose.Schema.Types.ObjectId, ref: 'priceList'}],
  oldPriceLists: [
    {
      "date": String,
      priceList: [{type: mongoose.Schema.Types.ObjectId, ref: 'priceList'}]
    }
  ]
});
const ModelClass = mongoose.model("vendor", Vendor);

module.exports = ModelClass;
module.exports.data = Vendor;
