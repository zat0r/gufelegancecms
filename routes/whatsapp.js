var express = require('express');
var router = express.Router();
var http = require("https");
var options = {
	"method": "POST",
	"hostname": "https://api.gupshup.io",
	"path": "sm/api/v1/msg",
	"headers": {
		'Cache-Control': 'no-cache',
    'apikey': 'fb5d3256b177450cc5981806105b696f',
    'content-type': 'application/x-www-form-urlencoded'
  }
  
};

var WAreq = http.request(options, function (res) {
	var chunks = [];

	res.on("data", function (chunk) {
    chunks.push(chunk);
  });
  res.on("end", function () {
		var body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

router.get('/', function(req, res, next) {
    var query = req.query
    console.log(query);
    if (query.type === 'sendWAmassage'){
      WAreq.write(JSON.stringify({'channel': 'whatsapp', 'source': '917834811114', 'destination': '962792880545', 'message':'test'}))
    }
    else{res.send('lol')}
  });
module.exports = router;
