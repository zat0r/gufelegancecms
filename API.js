const url = require("url");
const queryString = require('querystring');
const MongoClient = require('mongodb').MongoClient;
const clc = require('cli-color');
const dbcon = "mongodb+srv://ahmadZ:Ahmad1234@gulftestdp-6oj77.mongodb.net/test?retryWrites=true&w=majority";

function dataReq(o) {
  const parsed = url.parse(o.url);
  const query  = queryString.parse(parsed.query);
  console.log(clc.green("Data from : ") + clc.cyan(o.headers.referer));
  console.log(query);
  if (query.type === 'addUser') {
    MongoClient.connect(dbcon, function(err, db) {
      if (err) {console.log(clc.red.bold(err))};
      var dbo = db.db("users");
      var myobj = query;
      dbo.collection("login").insertOne(myobj, function(err, res) {
        if (err) {console.log(clc.red.bold(err))};
        console.log(res);
        db.close();
      });
  });

}
}

function ConDP(){
  MongoClient.connect(dbcon, function(err, db) {
    if (err) throw err;
    var dbo = db.db("users");
    var myobj = { name: "ahmd zaaterah", age: "29", city: "Amman", regdate: date };
    dbo.collection("login").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
});
}


module.exports.ConDP = ConDP;
module.exports.dataReq = dataReq;