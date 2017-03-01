const User = require('../../models/user');

function allUsers(req, res) {
  var user = req.body;
  var id = user._id;
  var idCheck = (req.params.id == id);
  if (idCheck) {
    User.find({}, function(err, users) {
    if(err) {
      return res.status(500).json({statusMessage: err.message});
    }
    //TODO: Remove or only return profile
      return res.status(200).json({'users': users, 'statusMessage':'Users Returned'});
  })
  } else {
    return res.status(401).json({statusMessage: "Are you logged in?"})
  }
}

module.exports = allUsers;
