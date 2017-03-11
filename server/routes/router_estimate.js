const Authentication = require('../controllers/authentication');
const passportService = require('../services/user/passport');
const estimateNew = require("../services/estimate/estimateNew");
const estimateDelete = require("../services/estimate/estimateDelete");
const estimateEdit = require("../services/estimate/estimateEdit");
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});
module.exports = function(app) {
  app.post('/api/user/:id/estimate/new', requireAuth, estimateNew);
  app.put('/api/user/:id/estimate/:estimateId/edit', requireAuth, estimateEdit);
  app.delete('/api/user/:id/estimate/:estimateId/delete', requireAuth, estimateDelete);
}
