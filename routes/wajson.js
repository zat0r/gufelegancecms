var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET prodacts listing. */
router.get('/', function(req, res, next) {
    fs.readFile('./data/wa.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    })
});

module.exports = router;