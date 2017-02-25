const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define, Create, Export

const Price = new Schema({
  item: String,
  description: String,
  unit: {
      type: Object,
      quantity: String,
      upn: String,
      currency: String,
      cost: String,
      id: String,
      stock: String,
      backorder: String,
  },
  region: String,
  address: String,
  range: String
});
const ModelClass = mongoose.model("price", Price);

module.exports = ModelClass;
