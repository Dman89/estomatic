const List = require('../models/listing');
module.exports = function(app) {
  app.get('/api/listings', function(req, res, next) {
    let statusMessage, ok, err;
    List.find({}, function(err, lists) {
      if (err) {
        err = err.message, ok = false, statusMessage = "Failed at Creating a New List";
        return res.status(500).json({err: err.message, statusMessage, ok});
      }
      else {
        statusMessage = "Successfully Grabbed Listings", ok = true;
        return res.status(200).json({statusMessage, ok, lists})
      }
    })
  })
  app.get('/api/listings/:id', function(req, res, next) {
    let statusMessage, ok, id = req.params.id, err;
    List.findById({_id: id}, function(err, lists) {
      if (err) {
        err = err.message, ok = false, statusMessage = "Failed at Creating a New List";
        return res.status(500).json({err: err.message, statusMessage, ok});
      }
      else {
        statusMessage = "Successfully Grabbed Listing", ok = true;
        return res.status(200).json({statusMessage, ok, lists})
      }
    })
  });
  app.post('/api/listings/new', function(req, res, next) {
    let statusMessage, ok, id = req.params.id, list = req.body, err;
    List.create(list, function(err, list) {
      if (err) {
        err = err.message, ok = false, statusMessage = "Failed at Creating a New List";
        return res.status(500).json({err, statusMessage, ok});
      }
      else {
        statusMessage = "Successfully Grabbed Listing", ok = true;
        return res.status(201).json({statusMessage, ok, list})
      }
    })
  });
  app.put('/api/listings/:id', function (req, res) {
    var id = req.params.id;
    var list = req.body;
    if (!list && list._id !== id) {
      return res.status(500).json({err: "ID does not match.", list: list, statusMessage:'ID does not match.', ok: false});
    }
    List.findByIdAndUpdate(id, list, {new: true}, function(err, list) {
      if(err) {
        return res.status(500).json({err: err.message, 'message':'Listing has Failed to Updated'});
      }
      //TODO: Remove or only return profile
      res.json({'list': list, 'statusMessage':'Listing has Updated'});
    })
  })
  app.delete('/api/listings/:id', function (req, res) {
  var id = req.params.id;
  List.findByIdAndRemove(id, function(err, result) {
    if (err) {
      return res.status(500).json({statusMessage: "Failed", err: err.message, ok: false})
    } else {
      res.json({statusMessage: 'Successfully Deleted User', ok: true});
      console.log('Deleted Listing');
    }
  })
})



}
