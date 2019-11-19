var express = require('express');
var router = express.Router({ mergeParams: true });

router.get('/', function(req, res, next) {
    var reqid = req.params.userId
    console.log(reqid);
    res.render('userinfo', { title: reqid, jsfile: 'js/Cusinfo.js'});
  });

  module.exports = router;