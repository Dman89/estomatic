const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Price = require('./price');

//Define, Create, Export

const Estimate = new Schema({
  Name: String,
  "Date": String,
  Description: String,
  Job: String,
  Address: String,
  Vendor: {
    ID: String,
    Name: String,
    Address: String,
    "Range": String,
    Region: String,
    PriceListId: String
  },
  ItemList: [Price.data]
});
const ModelClass = mongoose.model("estimate", Estimate);

module.exports = ModelClass;
module.exports.data = Estimate;
