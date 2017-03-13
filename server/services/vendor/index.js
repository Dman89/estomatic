const vendorNew = require("../services/vendor/vendorNew");
const vendorDelete = require("../services/vendor/vendorDelete");
const vendorEdit = require("../services/vendor/vendorEdit");
const vendorGet = require("../services/vendor/vendorGet");
const vendorsGet = require("../services/vendor/vendorsGet");

const vendorFNs = {
  new: vendorNew,
  get: vendorGet,
  gets: vendorsGet,
  edit: vendorEdit,
  del: vendorDelete,
}
module.exports = vendorFNs
