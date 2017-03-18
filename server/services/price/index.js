const newFunction = require("../services/vendor/new");
const deleteFunction = require("../services/vendor/delete");
const editFunction = require("../services/vendor/edit");

const itemListFNs = {
  new: newFunction,
  edit: editFunction,
  del: deleteFunction,
}
module.exports = itemListFNs
