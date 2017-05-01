const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define, Create, Export

const Vendor = new Schema({
  admins: Array,
  name: String,
  address: String,
  "range": String,
  region: String,
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
