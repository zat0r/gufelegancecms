var express = require('express');
var router = express.Router();  
var $ = require('jquery')

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
      $.ajax({
        url:'https://api.gupshup.io/sm/api/v1/msg',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        headers: {
          'apikey': 'fb5d3256b177450cc5981806105b696f',
          'cache-control': 'no-cache'
        },
        success: function(data){
          console.log(data)
        },
        error: function(data){
          console.log(data)
        }
      })
      res.send('worked')
    }
    else{res.send('lol')}
  });

module.exports = router;
