const User = require('../../models/user');

function editUser(req, res) {
  var user = req.body;
  var id = user._id;
  var idCheck = (req.params.id == id);
  if (idCheck) {
    User.findByIdAndUpdate(id, user, {new: true}, function(err, user) {
    if(err) {
      console.log(err);
      return res.status(500).json({statusMessage: err.message});
    }
    //TODO: Remove or only return profile
      return res.status(200).json({'user': user, 'statusMessage':'Profile Updated'});
  })
  } else {
    return res.status(401).json({statusMessage: "Are you logged in?"})
  }
}

module.exports = editUser;
