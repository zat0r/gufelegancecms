var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var headers = {
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/x-www-form-urlencoded',
  'apikey': 'fb5d3256b177450cc5981806105b696f',
  'cache-control': 'no-cache'
};

router.post('/', function(req, res, next) {
  var query = JSON.parse(req.body.messageobj)
  console.log('messagefrom :' == query.from) 

  if(query.text === 'lol') {
    res.send('loool')
  }
  else{
    res.send('لم أفهم عليك')
  }
})

router.get('/', function(req, res, next) {
    var query = req.query
    console.log(query);
    if (query.type === 'sendWAmassage'){
      sendWA('962792880545','مرحبا/بك')
    }
    else{res.send('lol')}
  });
  
  function sendWA(Num,Mes){
    var dataString = 'channel=whatsapp&source=917834811114&destination=' + Num + '&message=' + Mes;
    var options = {
      url: 'https://api.gupshup.io/sm/api/v1/msg',
      method: 'POST',
      headers: headers,
      body: dataString
    };

    request(options, callback);
  }
  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
        res.send(body)
    }
  }
module.exports = router;
