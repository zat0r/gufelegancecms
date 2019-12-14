var express = require('express');
var router = express.Router();

/* GET categories listing. */
router.get('/', function(req, res, next) {
  res.render('categories', { title: 'التصنيفات', script: '/js/pages/categories.js' });
});

module.exports = router;
