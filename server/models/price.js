const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define, Create, Export

const Price = new Schema({
  item: String,
  description: String,
  unitType: String,
  quantity: String,
  UPN: String,
  unitPriceCurrency: String,
  unitPrice: String,
  unitId: String,
  stock: String,
  backorder: String,
  region: String,
  address: String,
  "range": String
});
const price = mongoose.model("price", Price);

module.exports = price;
module.exports.data = Price;
