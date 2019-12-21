var express = require('express');
var router = express.Router();
var request = require('request')

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
      var options = {
        method: 'POST',
        url: 'https://api.gupshup.io/sm/api/v1/msg',
        headers: {
          'Cache-Control': 'no-cache',
          'apikey': 'fb5d3256b177450cc5981806105b696f',
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: JSON.stringify({channel: 'whatsapp', source: '917834811114', destination: '962792880545', message:'test'})
      }
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
      });
    }
    else{res.send('lol')}
  });
module.exports = router;
