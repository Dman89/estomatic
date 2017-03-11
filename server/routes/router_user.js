const Authentication = require('../controllers/authentication');
const passportService = require('../services/user/passport');
const deleteUser = require("../services/user/deleteUser");
const editUser = require("../services/user/edit");
const allUsers = require("../services/user/all");
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

  app.delete('/api/user/deleteAUser', deleteUser);
}
