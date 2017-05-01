const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define, Create, Export

const Vendor = new Schema({
  admins: Array,
  name: {type: String, required: true},
  address: {type: String, required: true},
  "range": {type: String, required: true},
  region: {type: String, required: true},
  priceList: [{type: mongoose.Schema.Types.ObjectId, ref: 'priceList'}],
  oldPriceLists: [
    {
      "date": String,
      priceList: [{type: mongoose.Schema.Types.ObjectId, ref: 'priceList'}]
    }
  ],
  TIME: Date
});
const ModelClass = mongoose.model("vendor", Vendor);

module.exports = ModelClass;
module.exports.data = Vendor;
