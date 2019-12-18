var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    var massage = req.body
    console.log(massage.botname);
    console.log(massage.messageobj)
    
      res.send('lol')
  });

module.exports = router;
