const Authentication = require('../controllers/authentication');
const passportService = require('../services/user/passport');
const V = require("../services/vendor");
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});
module.exports = function(app) {
  app.post('/api/vendors', V.gets);
  app.post('/api/vendor/:id', V.get);
  app.post('/api/user/:id/vendor/new', requireAuth, V.new);
  app.put('/api/user/:id/vendor/:vendorId/edit', requireAuth, V.edit);
  app.delete('/api/user/:id/vendor/:vendorId/delete', requireAuth, V.del);
}
