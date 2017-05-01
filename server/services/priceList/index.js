const priceListNew = require("./priceListNew");
const priceListDelete = require("./priceListDelete");
const priceListEdit = require("./priceListEdit");
const priceListGet = require("./priceListGet");
const priceListsGet = require("./priceListsGet");

const priceListFNs = {
  new: priceListNew,
  get: priceListGet,
  edit: priceListEdit,
  del: priceListDelete,
}
module.exports = priceListFNs
