var express = require('express');
var router = express.Router();
var multer  = require('multer')
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
var type = upload.fields([{ name: 'Mainpic', maxCount: 1 }, { name: 'OtherPics', maxCount: 8 }]);

router.post('/', type, function(req, res, next) {
    console.log(req.files);
    
    res.send(req.files);
 // res.render('index', { title: 'الرئيسية', jsfile: 'js/main.js'  });
});

module.exports = router;