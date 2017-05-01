const Authentication = require('../controllers/authentication');
const passportService = require('../services/user/passport');
const priceList = require("../services/priceList");
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});
module.exports = function(app) {
  app.get('/api/priceList/default', priceList.get)
}
