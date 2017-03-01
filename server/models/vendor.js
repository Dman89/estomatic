const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Price = require('./price');

//Define, Create, Export

const Vendor = new Schema({
  Name: String,
  Address: String,
  "Range": String,
  Region: String,
  PriceList: [Price.data],
  OldPriceLists: [
    {
      "Date": String,
      PriceList: [Price.data]
    }
  ]
});
const ModelClass = mongoose.model("vendor", Vendor);

module.exports = ModelClass;
module.exports.data = Vendor;
