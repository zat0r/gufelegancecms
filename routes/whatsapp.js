var express = require('express');
var router = express.Router();
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: 'a69c1769',
  apiSecret: 'kPMKMukkXA4fimil',
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
      WAreq('مرحبا', '962792880545')
    }
    else{res.send('lol')}
  });
function WAreq(text, number){
  const message = {
    content: {
      type: 'text',
      text: text,
    },
  };
  nexmo.channel.send(
    { type: 'whatsapp', number: number },
    message,
    (err, data) => { console.log(data); }
  );
}
module.exports = router;
