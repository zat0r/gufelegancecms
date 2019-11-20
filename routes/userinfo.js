var express = require('express');
const clc = require('cli-color');
const MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
const queryString = require('querystring');
var router = express.Router({ mergeParams: true });

/* Conniction configration. */
const dbcon = "mongodb+srv://ahmadZ:Ahmad#1234@gulftestdp-6oj77.mongodb.net/test?retryWrites=true&w=majority";
const mongOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

router.get('/', function(req, res, next) {
    var reqid = req.params.userId;
    var o_id = new ObjectId(reqid)
    console.log(reqid)
    MongoClient.connect(dbcon, mongOptions, function(err, db) {
      if (err) {console.log(clc.red.bold(err))};
      var query = {_id: o_id};
      var dbo = db.db("testserver");
      dbo.collection("customers").find(query).toArray(function(err, data) {
        if (err) {console.log(clc.red.bold(err))};
       res.render('userinfo', 
       { title: "بيانات المستخدم",
        jsfile: '/js/Cusinfo.js',
        userid: data[0]._id,
        username: data[0].Name,
        useremail: data[0].Email,
        usercity: data[0].City,
        userbd: data[0].BirthDay,
        usercountry: data[0].Country,
        userphone: data[0].Phone,
        userAddress: data[0].Address,
        userreg: data[0].RegDate});
      });
  });
});

  module.exports = router;