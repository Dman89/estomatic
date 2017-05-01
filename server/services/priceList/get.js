var list = [{
  item: "Duct Tape",
  description: "Strong Adhesive Tape",
  unitType: "Tape",
  quantity: "2",
  UPN: "71345208781",
  unitPriceCurrency: "USD",
  unitPrice: "4.50",
  unitId: "1gHt3",
  stock: "5",
  backorder: "false",
  region: "WWW",
  address: "www.google.com",
  "range": "World Wide",
  date: new Date(new Date().getMinutes() + 1);
},
{
  item: "Ranch",
  description: "Pizza Sauce",
  unitType: "Food",
  quantity: "20oz",
  UPN: "5345218781",
  unitPriceCurrency: "USD",
  unitPrice: "3.25",
  unitId: "Do3lGki12",
  stock: "100oz",
  backorder: "false",
  region: "USA",
  address: "So Cal",
  "range": "USA",
  date: new Date(new Date().getMinutes() + 2);
},
{
  item: "Cup",
  description: "Vessal for your Beverage",
  unitType: "Container",
  quantity: "1",
  UPN: "998844739",
  unitPriceCurrency: "USD",
  unitPrice: "5.65",
  unitId: "ICUP1he2HE3",
  stock: "3",
  backorder: "false",
  region: "USA",
  address: "World Wide",
  "range": "USA",
  date: new Date(new Date().getMinutes() + 3);
}]

module.exports = function(req, res) {
  return res.status(200).json({statusMessage: "Successful", priceList: list})
}
