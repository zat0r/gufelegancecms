var express = require('express');
var router = express.Router();

/* GET prodacts listing. */
router.get('/', function(req, res, next) {
  res.render('prodacts', { title: 'المنتجات', script: 'js/pages/prodacts.js'});
});

module.exports = router;
