var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'الرئيسية', jsfile: 'js/main.js'  });
});

module.exports = router;
