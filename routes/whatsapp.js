var express = require('express');
var router = express.Router();
var http = require('http');
var conop = {
  hostname: 'https://api.gupshup.io',
  path: '/sm/api/v1/msg',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'apikey': 'fb5d3256b177450cc5981806105b696f',
    'cache-control': 'no-cache'
  }
}

var WAreq = http.request(conop, (res) => {
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

WAreq.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

router.post('/', function(req, res, next) {
    var massage = JSON.parse(req.body.messageobj)
    console.log(massage.from);
    console.log(massage.text);
    if (massage.text === 'مرحبا'){
      res.send('مرحبا بك في الرد الألي لأناقة الخليج ')
    }
    if (massage.text === 'عباية'){
        res.send('يوجد لدينا تشكيلة ضخمة من العبايات')
    }
    if (massage.text === 'طلب'){
        res.send('ماهي طلباتك')
    }
      
      else{
        res.send('لم أفهم عليك')
      }
  });

router.get('/', function(req, res, next) {
    var query = req.query
    console.log(query);
    if (query.type === 'sendWAmassage'){
      WAreq('channel=whatsapp&source=917834811114&destination=962792880545&message=مرحبا')
    }
    else{res.send('lol')}
  });

module.exports = router;
