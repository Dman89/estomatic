const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define, Create, Export

const PriceList = new Schema({
  name: String,
  address: String,
  "range": String,
  region: String,
  date: String,
  expDate: String,
  vendorId: String,
  items: [{type: mongoose.Schema.Types.ObjectId, ref: 'price'}]
});
const ModelClass = mongoose.model("priceList", PriceList);

module.exports = ModelClass;
module.exports.data = PriceList;
