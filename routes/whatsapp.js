var express = require('express');
var router = express.Router();
var request = require('ajax-request');
var url = 'https://api.gupshup.io/sm/api/v1/msg'
var header = {
  'Cache-Control': 'no-cache',
  'apikey': 'fb5d3256b177450cc5981806105b696f',
  'Content-Type':'application/x-www-form-urlencoded'
}

router.get('/', function(req, res, next) {
    var query = req.query
    console.log(query);
    if (query.type === 'sendWAmassage'){
      request({
        url: url,
        method: 'POST',
        headers: header,
        data: 'channel=whatsapp&source=917834811114&destination=962792880545&message=مرحبا'
      }, function(err, vres, body) {
        if (err) throw err;
        console.log(vres.res)
        res.send(body)
      });
    }
    else{res.send('lol')}
  });
module.exports = router;
