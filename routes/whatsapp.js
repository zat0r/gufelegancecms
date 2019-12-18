var express = require('express');
var router = express.Router();
const accountSid = 'AC97de09f024eb0ff6075408075de3fe2d'; 
const authToken = '05a3d6bf3ef96e161dcf9ceab15aa709'; 
const client = require('twilio')(accountSid, authToken); 
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const response = new MessagingResponse();
const message = response.message();

router.post('/', type, function(req, res, next) {
    message.body('Hello World!');
    response.redirect('https://timberwolf-mastiff-9776.twil.io/demo-reply');
  });

console.log(response.toString());
/* GET WhatsApp listing. */
router.get('/', function(req, res, next) {
    var query = req.query
    console.log(query)
    if (query.type === 'sendTestMassage') {
        client.messages 
      .create({ 
         body: 'test test', 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:+962792880545' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();
      Data("Massage sent")
        }else{
            res.send('This is Whatsapp page');
        }
    function Data(msg) {
    res.send(JSON.stringify({ 'success': msg }));
  }
});

module.exports = router;
