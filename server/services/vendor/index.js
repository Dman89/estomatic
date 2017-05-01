const vendorNew = require("./vendorNew");
const vendorDelete = require("./vendorDelete");
const vendorEdit = require("./vendorEdit");
const vendorGet = require("./vendorGet");
const vendorsGet = require("./vendorsGet");

const vendorFNs = {
  new: vendorNew,
  get: vendorGet,
  gets: vendorsGet,
  edit: vendorEdit,
  del: vendorDelete,
}
module.exports = vendorFNs
