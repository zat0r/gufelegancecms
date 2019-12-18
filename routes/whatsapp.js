var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log(req.botname);
    console.log(req.messageobj)
    var lol = {"messages": [
          {
            "id": "gBEGkZlgSYgQAgldNuJwtPwiviY"
          }
        ],
        "meta": {
          "api_status": "stable",
          "version": "2.21.6"
        }
      } 
      res.send(lol)
  });

module.exports = router;
