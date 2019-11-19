var express = require('express');
var router = express.Router();

router.get('/users/:userId', function(req, res, next) {
    var reqid = req.params.userid
    console.log(reqid);
    res.render('userinfo', { title: reqid, jsfile: 'js/Cusinfo.js'});
  });

  module.exports = router;