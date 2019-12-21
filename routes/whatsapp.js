var express = require('express');
var router = express.Router();
var request = require('request')
var url = 'https://api.gupshup.io/sm/api/v1/msg'
var header = {
  'Cache-Control': 'no-cache',
  'apikey': 'fb5d3256b177450cc5981806105b696f',
  'content-type': 'application/x-www-form-urlencoded'
}

router.get('/', function(req, res, next) {
    var query = req.query
    console.log(query);
    if (query.type === 'sendWAmassage'){
      request.post({url: url, headers: header, json: {'channel': 'whatsapp','source':'917834811114','destination':'962792880545','message':'grouptest'}}, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
      });
    }
    else{res.send('lol')}
  });
module.exports = router;
