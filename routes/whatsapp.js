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
  console.log(clc.bgGreenBright('messagefrom: ') + SN)
  console.log(clc.bgBlue('messagetext: ') + query.text)
  FirstMas(req, res, SN, query)
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
function FirstMas(req, fres, Num, query){
/* create conniction with Database. */
MongoClient.connect(dbcon, mongOptions, function (err, db) {
  if (err) { console.log(clc.red.bold(err)) };
  var dbo = db.db("cmsdb");
  dbo.collection("WA").find({}).toArray(function (err, res) {
    if (err) { console.log(clc.red.bold(err)) };
    var Old = false
    console.log(clc.green("WA Numbers: ") + clc.red(res.length)); 
    for(i = 0; i < res.length; i++){
      if( res[i].Number === Num){
        var Old = true
        Console.log('Number exist')
      }
    }
    if(Old === false){
      fres.send('مرحبا بكم في أناقة الخليج.. معكم الرد الألي ')
      dbo.collection("WA").insertOne({Number: Num}, function (err, res) {
        if (err) { console.log(clc.red.bold(err)) };
        console.log(clc.green("WA Num Added : ") + clc.red(res.insertedId));
      });
    }
    db.close();
  });
});
}
module.exports = router;
