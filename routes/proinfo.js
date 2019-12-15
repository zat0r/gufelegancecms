var express = require('express');
const clc = require('cli-color');
const MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
var router = express.Router({ mergeParams: true });

/* Conniction configration. */
const dbcon = "mongodb+srv://ahmadZ:rw5GAkA8cSfX7FaS@gulftestdp-6oj77.mongodb.net/test?retryWrites=true&w=majority";
const mongOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

/* GET prodacts listing. */
router.get('/', function(req, res, next) {
  var reqid = req.params.proId;
  console.log(reqid)
  if (reqid === "add"){
    res.render('infopro', { title: 'إضافة منتج جديد', script: '/js/pages/infopro.js', proid: '', proname: '', procat: '', probuy: '', prosell: '', barcode: '', quantity: '', mainpic: '', tdpic: '', otherpics: '', onlinestatus: '', onlineabout: '', onlinecreate: '', onlinecontain: ''});
  }else{
    var o_id = new ObjectId(reqid);
    console.log(o_id);
    MongoClient.connect(dbcon, mongOptions, function(err, db) {
      if (err) {console.log(clc.red.bold(err))};
      var query = {_id: o_id};
      var dbo = db.db("cmsdb");
      dbo.collection("prodacts").find(query).toArray(function(err, data) {
        if (err) {console.log(clc.red.bold(err))};
        console.log(data)
        res.render('infopro', { title: 'إظهار المنتج: ' + data[0].name, script: '/js/pages/infopro.js',
        proid: data[0]._id,
        proname: data[0].name,
        procat: data[0].catagory,
        probuy: data[0].buy,
        prosell: data[0].sell,
        barcode: data[0].barcode,
        quantity: data[0].quantity.mainstore,
        mainpic: data[0].pics.main,
        tdpic: data[0].pics.tdpic,
        otherpics: data[0].pics.otherpic,
        onlinestatus: data[0].online.status,
        onlineabout: data[0].online.about,
        onlinecreate: data[0].online.create,
        onlinecontain: data[0].online.contain
      });
      });
    });
  }
});

module.exports = router;