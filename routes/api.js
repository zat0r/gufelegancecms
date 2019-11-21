var express = require('express');
var url = require('url');
var router = express.Router();
const clc = require('cli-color');   
const MongoClient = require('mongodb');
const queryString = require('querystring');

/* Conniction configration. */
const dbcon = "mongodb+srv://ahmadZ:rw5GAkA8cSfX7FaS@gulftestdp-6oj77.mongodb.net/test?retryWrites=true&w=majority";
//const dbcon = "mongodb://localhost:27017/"; Local connction
const mongOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

router.get('/', function(req, res, next) {
    var parsed = url.parse(req.url);
    var query  = queryString.parse(parsed.query);
    console.log(clc.green("Data from : ") + clc.cyan(req.headers.referer));
     /* create conniction with Database. */
    MongoClient.connect(dbcon,   function(err, db) {
        if (err) {console.log(clc.red.bold(err))};
        var dbo = db.db("cmsdb");

        if (query.type === 'addUser')  {
            console.log(clc.bgBlueBright.bold("Add User working"));
            dbo.collection("users").insertOne(query, function(err, res) {
              if (err) {console.log(clc.red.bold(err))};
              console.log(clc.green("Users Added _id : ") + clc.red(res.insertedId));Data(res);db.close();
        });} 
        if (query.type === 'getUser')  {
            console.log(clc.bgBlueBright.bold("Get User working"));
            dbo.collection("users").find({}).toArray(function(err, res) {
              if (err) {console.log(clc.red.bold(err))};
              console.log(clc.green("Users Sent: ") + clc.red(res.length));Data(res);db.close();
        });}
    }); 
    function Data(msg) {
        res.send(JSON.stringify({'success': msg}));
    }   
});

module.exports = router;