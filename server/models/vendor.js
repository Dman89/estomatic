const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define, Create, Export

const Vendor = new Schema({
  priceList: Object,
  oldPriceLists: [Object]
});
const ModelClass = mongoose.model("vendor", Vendor);

module.exports = ModelClass;
