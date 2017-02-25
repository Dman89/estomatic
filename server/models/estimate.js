const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define, Create, Export

const Estimate = new Schema({
  vendor: {Object},
  itemList: [Object]
});
const ModelClass = mongoose.model("estimate", Estimate);

module.exports = ModelClass;
