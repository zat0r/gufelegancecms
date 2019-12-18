var express = require('express');
var router = express.Router();
var request = require('request');


router.post('/', function(req, res, next) {
    var massage = req.body.messageobj
    console.log(massage.from);
    console.log(massage.text);
    if (massage.text === 'مرحبا'){
      res.send('مرحبا بك في الرد الألي لأناقة الخليج ')
    }
    if (massage.text === 'عباية'){
        res.send('يوجد لدينا تشكيلة ضخمة من العبايات')
      }
  });

router.get('/', function(req, res, next) {
    var query = req.query
    console.log(query);
    if (query.type === 'sendWAmassage'){

    }
      res.send('lol')
  });

module.exports = router;
