var express = require('express');
var router = express.Router();
const https = require('https')
const options = {
  hostname: 'api.gupshup.io',
  port: 443,
  path: '/sm/api/v1/msg',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'apikey': 'fb5d3256b177450cc5981806105b696f',
    'cache-control': 'no-cache'
  }
}
const WAreq = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})
WAreq.on('error', error => {
  console.error(error)
})
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
      WAreq.write('channel=whatsapp&source=917834811114&destination962792880545=&message=مرحبا')
      res.send('worked')
    }
    else{res.send('lol')}
  });

module.exports = router;
