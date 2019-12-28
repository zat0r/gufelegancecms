var express = require('express');
var router = express.Router();
var clc = require('cli-color');
var MongoClient = require('mongodb');
var WA = require('./whatsapp')

/* Conniction configration. */
var dbcon = "mongodb+srv://ahmadZ:rw5GAkA8cSfX7FaS@gulftestdp-6oj77.mongodb.net/test?retryWrites=true&w=majority";
//const dbcon = "mongodb://localhost:27017/"; Local connction
var mongOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

/* GET prodacts listing. */
router.get('/', function(req, res, next) {
  var type = req.query.type
  console.log(clc.red(type))
  MongoClient.connect(dbcon, mongOptions, function (err, db) {
    if (err) { console.log(clc.red.bold(err)) };
    var dbo = db.db("cmsdb");

    if (type === 'login'){
        var userNumber = req.query.usernumber
        var info = { Phone: userNumber }
        console.log(clc.bgBlueBright.bold("Get Login Number: " + userNumber));
      dbo.collection("users").find(info).toArray(function (err, res) {
        if (err) { console.log(clc.red.bold(err)) };
        if(res.length === 0){
            Data(res, 'notfound')
        }else{
            Data(res, 'found')
            addlogin(userNumber)
        }
      });
    }
    if (type === 'checkLogin'){
        var userlogin = new MongoClient.ObjectId(req.query.login)
        var info = { id: userlogin }
        console.log(clc.bgBlueBright.bold("check Login Number: " + userlogin));
      dbo.collection("login").find(info).toArray(function (err, res) {
        if (err) { console.log(clc.red.bold(err)) };
        if(res.length === 0){
            Data(res, 'notfound')
        }else{
            Data(res, 'found')
        }
      });     
    }
    if (type === 'register'){
      var userNumber = req.query.data.Number
      var userdata = req.query.data
      var info = { Phone: userNumber }
        console.log(clc.bgBlueBright.bold("Get register data: ") + userdata);
      dbo.collection("users").find(info).toArray(function (err, res) {
        if (err) { console.log(clc.red.bold(err)) };
        if(res.length === 0){
            console.log('check user : notfound')
            var verfy = Math.floor(1000 + Math.random() * 9000);
            var mesnum = userNumber.replace(userNumber[0], '962');
            var regdata = {Number: userNumber, verfy: verfy, data: userdata}
            WA.sendWAMas(mesnum, 'رمز التأكيد: *' + verfy + '*');
            dbo.collection("register").insertOne(regdata, function (err, res) {
              if (err) { console.log(clc.red.bold(err)) };
              console.log(clc.green("register data _id : ") + clc.red(res.insertedId));
              Data(res, 'registered')
              db.close();
          })
        }else{
          console.log('check user : found .... break')
            Data(res, 'found')
            db.close();
        }
      });
    }
    function Data(msg, stat){
        res.send({success: msg, status: stat})
    } 
});
});
function addlogin(userinfo){
    MongoClient.connect(dbcon, mongOptions, function (err, db) {
        if (err) { console.log(clc.red.bold(err)) };
        var dbo = db.db("cmsdb");
        dbo.collection("login").insertOne(userinfo, function (err, res) {
            if (err) { console.log(clc.red.bold(err)) };
            console.log(clc.green("login data _id : ") + clc.red(res.insertedId));
            db.close();
        })
    })
}
module.exports = router;