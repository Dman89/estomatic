var config = require('../config'), apikey = config.wpk, userApiKey = "8t569g8s75g8", fs = require('fs'), axios = require('axios');
module.exports = function(app) {
  app.get('/api/weather/forecast/5day/:req', GETcityNameWeather);

}

function GETcityNameWeather(req, res) {
  r = req.params.req;
  var got_key = gotAPIKey(r);
  if (got_key) {
    var got_working_key = gotWorkingAPIKey(r);
    if (got_working_key) {
      var query = (r.match(/[q\=]{2}[a-zA-Z0-9]*/))[0];
      var url = "http://api.openweathermap.org/data/2.5/forecast?"+query+",us&appid="+apikey;
      axios.get(url).then(function(response) {
         data = response.data;
        return res.status(200).json({ok: "true", statusMessage: "Works!", weather: data})
      }).catch(function(response) {
         data = response.data;
        return res.status(401).json({ok: "false", statusMessage: "Bad Request!", weather: data})
      })
    } else {
      return res.status(401).json({ok: "false", statusMessage: "Wrong API Key!"})
    }
  }
  else {
    return res.status(401).json({ok: "false", statusMessage: "No API Key!"})
  }
}

function gotWorkingAPIKey(req) {
  let r = req.match(/[\&]{1}[apid]{5}[\=]{1}[a-zA-Z0-9]*/);
  r = r[0];
  r = r.split("=");
  r = r[1];
  r = (r === userApiKey);
  return r
}
function gotAPIKey(req) {
  return (req.search(/[\&]{1}[apid]{5}[\=]{1}[a-zA-Z0-9]*/) >= 0)
};
