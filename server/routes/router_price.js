const Authentication = require('../controllers/authentication');
const passportService = require('../services/user/passport');
const price = require("../services/price");
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});
module.exports = function(app) {
  app.post('/api/:id/price', price.new)
  app.delete('/api/:id/price/:priceId', price.del)
  app.put('/api/:id/price/:priceId', price.edit)
}
