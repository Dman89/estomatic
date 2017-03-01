const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const deleteUser = require("../services/deleteUser");
const editUser = require("../services/user/edit");
const allUsers = require("../services/user/all");
const estimateNew = require("../services/user/estimateNew");
const estimateDelete = require("../services/user/estimateDelete");
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});
module.exports = function(app) {
  app.get('/api/welcome', function(req, res) {
    res.status(200).send({welcome: "Welcome"});
  })
  app.get('/api/users', allUsers)
  app.get('/api/user/profile', requireAuth, function(req, res) {
    res.status(200).send({user: req.user});
  })
  app.post('/api/user/signup', Authentication.signup);
  app.post('/api/user/signin', requireLogin, Authentication.login);
  app.put('/api/user/:id/edit', requireAuth, editUser)
  app.post('/api/user/:id/estimate/new', requireAuth, estimateNew);
  app.delete('/api/user/:id/estimate/:estimateId/delete', requireAuth, estimateDelete);





  app.delete('/api/user/deleteAUser', deleteUser);



}
