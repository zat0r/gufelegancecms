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

router.get('/', function (req, res, next) {
  var query = req.query;
  console.log(clc.green("Data from : ") + clc.cyan(req.headers.referer));
  /* create conniction with Database. */
  MongoClient.connect(dbcon, mongOptions, function (err, db) {
    if (err) { console.log(clc.red.bold(err)) };
    var dbo = db.db("cmsdb");

    if (query.type === 'addUser') {
      console.log(clc.bgBlueBright.bold("Add User working"));
      dbo.collection("users").insertOne(query.data, function (err, res) {
        if (err) { console.log(clc.red.bold(err)) };
        console.log(clc.green("Users Added _id : ") + clc.red(res.insertedId)); Data(res); db.close();
      });
    }
    if (query.type === 'getUsers') {
      console.log(clc.bgBlueBright.bold("Get All Users working"));
      dbo.collection("users").find({}).toArray(function (err, res) {
        if (err) { console.log(clc.red.bold(err)) };
        console.log(clc.green("Users Sent: ") + clc.red(res.length)); Data(res); db.close();
      });
    }
    if (query.type === 'getinfo') {
      var o_id = new MongoClient.ObjectId(query.idinfo)
      varinfo = { _id: o_id }
      console.log(clc.bgBlueBright.bold("Get User ID: " + query.idinfo));
      dbo.collection("users").find(varinfo).toArray(function (err, res) {
        if (err) { console.log(clc.red.bold(err)) };
        console.log(clc.green("user info name sent: ") + clc.red(res[0].Name)); Data(res); db.close();
      });
    }
    if (query.type === 'UpdateUser') {
      var o_id = new MongoClient.ObjectId(query.userid)
      var dselect = { _id: o_id }
      var newvalues = { $set: query.data }
      console.log(clc.bgBlueBright.bold("‘Update User ID: " + query.userid));
      dbo.collection("prodacts").updateOne(dselect, newvalues, function (err, res) {
        if (err) throw err;
        console.log(clc.green("user info Updated: ") + clc.red(query.Name)); Data(res); db.close();
      });
    }
    if (query.type === 'ProCatCount') {
      var dselect = { catagory: query.name }
      var getvalue = { $match}
      console.log(clc.bgBlueBright.bold("‘check Categories Count: " + query.name));
      dbo.collection("prodacts").find(dselect).toArray(function (err, res) {
        if (err) { console.log(clc.red.bold(err)) };
        console.log(clc.green("pro caount : ") + clc.red(res.length)); Data(res.length); db.close();
      });
    }
    if (query.type === 'Updateprodact') {
      console.log(query.data)
      var o_id = new MongoClient.ObjectId(query.proid)
      var dselect = { _id: o_id }
      var newvalues = { $set: query.data }
      console.log(clc.bgBlueBright.bold("‘Update User ID: " + query.userid));
      dbo.collection("prodacts").updateOne(dselect, newvalues, function (err, res) {
        if (err) throw err;
        console.log(clc.green("user info Updated: ") + clc.red(query.Name)); Data(res); db.close();
      });
    }
    if (query.type === 'getprodacts') {
      console.log(clc.bgBlueBright.bold("Get All Prodacts working"));
      dbo.collection("prodacts").find({}).toArray(function (err, res) {
        if (err) { console.log(clc.red.bold(err)) };
        console.log(clc.green("prodacts Sent: ") + clc.red(res.length)); Data(res); db.close();
      });
    }
    if (query.type === 'addprodact') {
      console.log(clc.bgBlueBright.bold("Add User working"));
      dbo.collection("prodacts").insertOne(query.data, function (err, res) {
        if (err) { console.log(clc.red.bold(err)) };
        console.log(clc.green("Prodact Added _id : ") + clc.red(res.insertedId)); Data(res); db.close();
      });
    }
    if (query.type === 'getcat') {
      console.log(clc.bgBlueBright.bold("Get All categories working"));
      dbo.collection("categorys").find({}).toArray(function (err, res) {
        if (err) { console.log(clc.red.bold(err)) };
        console.log(clc.green("categories Sent: ") + clc.red(res.length)); Data(res); db.close();
      });
    }
    if (query.type === 'DeleteCat') {
      var o_id = new MongoClient.ObjectId(query.id)
      var dselect = { _id: "ObjectId(" + o_id + ")" }
      console.log(dselect)
      console.log(clc.bgRedBright.bold("delete category working"));
      dbo.collection("categorys").deleteOne(dselect).toArray(function (err, res) {
        if (err) { console.log(clc.red.bold(err)) };
        console.log(clc.green("category Deleted: ") + clc.red(res)); Data(res); db.close();
      });
    }

  });
  function Data(msg) {
    res.send(JSON.stringify({ 'success': msg }));
  }
});

module.exports = router;