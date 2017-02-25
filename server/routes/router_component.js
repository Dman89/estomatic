const express  = require('express');
const passport = require('passport');
module.exports = function(app) {
  app.use("/", express.static('public'));
  app.use("/listings", express.static('public'));
  app.use("/listings/:id", express.static('public'));
  app.use("/welcome", express.static('public'));
  app.use("/:userId/messages", express.static('public'));
  app.use("/:userId/messages/:id", express.static('public'));
  app.use("/:userId/favorites/", express.static('public'));
  app.use("/:userId/favorites/:id", express.static('public'));
  app.use("/:userId/my/listings", express.static('public'));
  app.use("/:userId/my/listings/:id", express.static('public'));
  app.use("/:userId/my/listings/edit/:id", express.static('public'));
  app.use("/:userId/profile", express.static('public'));
  app.use("/signin", express.static('public'));
  app.use("/signout", express.static('public'));
  app.use("/signup", express.static('public'));
}
