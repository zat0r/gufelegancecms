var express = require('express');
var router = express.Router();
var request = require('request')

router.get('/', function(req, res, next) {
    var query = req.query
    console.log(query);
    if (query.type === 'sendWAmassage'){
      var options = {
        method: 'POST',
        url: 'https://api.gupshup.io/sm/api/v1/msg',
        headers: {
          'Cache-Control': 'no-cache',
          'apikey': 'fb5d3256b177450cc5981806105b696f',
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {'channel': 'whatsapp', 'source': '917834811114', 'destination': '962792880545', 'message':'test'}
      }
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
      });
    }
    else{res.send('lol')}
  });
module.exports = router;
