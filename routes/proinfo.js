var express = require('express');
const clc = require('cli-color');
const MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
const queryString = require('querystring');
var router = express.Router({ mergeParams: true });

/* Conniction configration. */
const dbcon = "mongodb+srv://ahmadZ:rw5GAkA8cSfX7FaS@gulftestdp-6oj77.mongodb.net/test?retryWrites=true&w=majority";
const mongOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  var reqid = req.params.info;
  if (reqid === "add"){
    res.render('proinfo', { title: 'إضافة منتج جديد', jsfile: '/js/Proinfo.js'  });
  }
});

module.exports = router;