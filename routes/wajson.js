var express = require('express');
var router = express.Router();

/* GET prodacts listing. */
router.get('/', function(req, res, next) {
  res.render('temdata/wa.json');
});

module.exports = router;