const Authentication = require('../controllers/authentication');
const passportService = require('../services/user/passport');
const V = require("../services/vendor");
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});
module.exports = function(app) {
  app.get('/api/vendors', V.gets);
  app.get('/api/vendor/:id', V.get);
  app.post('/api/vendor/new', requireAuth, V.new);
  app.put('/api/vendor/:id/edit', requireAuth, V.edit);
  app.delete('/api/vendor/:id/delete', requireAuth, V.del);
}
