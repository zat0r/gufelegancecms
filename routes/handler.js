var express = require('express');
var router = express.Router();
var multer  = require('multer');
const clc = require('cli-color');   
var fs = require('fs');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/prodacts/');
    },
    filename: function (req, file, cb) {
      var originalname = file.originalname;
      var extension = originalname.split(".");
      filename = file.fieldname + '-' + Date.now() + '.' + extension[extension.length-1];
      cb(null, filename);
    }
  });
var upload = multer( { dest: './public/images/prodacts/', storage: storage } );    
var type = upload.fields([{ name: 'Mainpic', maxCount: 1 }, { name: 'OtherPics', maxCount: 8 }, { name: 'tdpic', maxCount: 1}]);

router.post('/', type, function(req, res, next) {
  console.log(clc.bgBlueBright.bold("Post Handler working"));
    res.send(req.files);
});

router.get('/', function(req,res,next){
  console.log(clc.bgBlueBright.bold("Get Handler working"));
 if (req.query.type === 'deleteFile'){
   fs.unlinkSync('./' + req.query.name)
   console.log('File "' + clc.green(req.query.name) + '"' + clc.red.bold(' is deleted'))
   res.send({msg: 'file "' + req.query.name + '" is deleted'})
   return
 }if (req.query.type === 'checkFile'){
  var stats = fs.statSync('./' + req.query.url)
  var fileSizeInBytes = stats["size"]
  res.send({msg: 'exist', name: req.query.name, size: fileSizeInBytes, url: req.query.url})
 }else {
  res.status(200)
  res.send('what do you want ??')
 }

 

})

module.exports = router;