const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define, Create, Export

const PriceList = new Schema({
<<<<<<< HEAD
  name: String,
  address: String,
  "range": String,
  region: String,
  date: String,
  expDate: String,
  vendorId: String,
  items: [{type: mongoose.Schema.Types.ObjectId, ref: 'price'}],
  description: String,
  region: String,
  address: String,
  "range": String,
  date: Date
});
const price = mongoose.model("priceList", PriceList);

module.exports = price;
module.exports.data = PriceList;
