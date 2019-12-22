var express = require('express');
var router = express.Router();
var request = require('request');
var clc = require('cli-color');
var MongoClient = require('mongodb');
/* Conniction configration. */
var dbcon = "mongodb+srv://ahmadZ:rw5GAkA8cSfX7FaS@gulftestdp-6oj77.mongodb.net/test?retryWrites=true&w=majority";
//var dbcon = "mongodb://localhost:27017/"; Local connction
var mongOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
var headers = {
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/x-www-form-urlencoded',
  'apikey': 'fb5d3256b177450cc5981806105b696f',
  'cache-control': 'no-cache'
};

router.post('/', function (req, res, next) {
  var query = JSON.parse(req.body.messageobj)
  var SN = query.from.replace('962', '0')
  var old = false;
  console.log('messagefrom :' + SN)
  console.log('messagetext :' + query.text)
  if (old === false){
    res.send('مرحبا بك في أناقة الخليج .. كيف ممكن أن أساعدك')
  }
  if (query.text === 'lol') {
    res.send('loool')
  }else {
    res.send('لم أفهم عليك')
  }
  
})

router.get('/', function (req, res, next) {
  var query = req.query
  console.log(query);
  if (query.type === 'sendWAmassage') {
    var dataString = 'channel=whatsapp&source=917834811114&destination=962792880545&message=إختبار'
    var options = {
      url: 'https://api.gupshup.io/sm/api/v1/msg',
      method: 'POST',
      headers: headers,
      body: dataString
    };

    request(options, callback);
  }
  else { res.send('lol') }
  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.send(body)
    }
  }
});

module.exports = router;
