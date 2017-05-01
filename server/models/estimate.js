const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define, Create, Export

const Estimate = new Schema({
  name: String,
  "date": String,
  description: String,
  job: String,
  address: String,
  vendor: {
    type: mongoose.Schema.Types.ObjectId, ref: 'vendor'
  },
  priceList: {type: mongoose.Schema.Types.ObjectId, ref: 'priceList'},
  itemList: [{type: mongoose.Schema.Types.ObjectId, ref: 'price'}]
});
const ModelClass = mongoose.model("estimate", Estimate);

module.exports = ModelClass;
module.exports.data = Estimate;
