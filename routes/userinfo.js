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

router.get('/', function(req, res, next) {
    var reqid = req.params.userId;
    var o_id = new ObjectId(reqid);
    console.log(o_id);
    MongoClient.connect(dbcon, mongOptions, function(err, db) {
        if (err) {console.log(clc.red.bold(err))};
        var query = {_id: o_id};
        var dbo = db.db("cmsdb");
        dbo.collection("users").find(query).toArray(function(err, data) {
            if (err) {console.log(clc.red.bold(err))};
            res.render('infouser', { title: 'البيانات الشخصية', script: '/js/pages/infouser.js',
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

    })
});

module.exports = router;