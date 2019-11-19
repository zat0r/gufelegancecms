var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'المستخدمسن', jsfile: 'js/CusData.js'  });
});

module.exports = router;
