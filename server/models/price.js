const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define, Create, Export

const Price = new Schema({
  Item: String,
  Description: String,
  UnitType: String,
  Quantity: String,
  UPN: String,
  UnitPriceCurrency: String,
  UnitPrice: String,
  UnitId: String,
  Stock: String,
  Backorder: String,
  Region: String,
  Address: String,
  "Range": String
});
const price = mongoose.model("price", Price);

module.exports = price;
module.exports.data = Price;
