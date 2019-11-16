const http = require('http');
const url = require('url');
const fs = require('fs');
const api = require('./API')
const clc = require('cli-color');
const port = 3000;

function pages() {
    http.createServer(function (req, res) {
        var q = url.parse(req.url, true).pathname;

        var stylejava = "." + q;
          console.log(clc.blue(q));
          if (q === '/'){
            fs.readFile('./page/index.html', function(err, data) {if (err) {weberror()} websec(data)});
          }
          if (q === '/api'){
            api.dataReq(req);
            fs.readFile('./API.js', function(err, data) {if (err) {weberror()} websec(data)});
          }
          if(q === '/customer'){
            fs.readFile('./page/customer.html', function(err, data) {if (err) {weberror()} websec(data)});
          }
          if(req.url.indexOf('.css') != -1){
            fs.readFile(stylejava, function(err, data) {if (err) {weberror()} 
            res.writeHead(200, {'Content-Type': 'text/css'});
              res.write(data);
              return res.end();
            });
          }
          if(req.url.indexOf('.js') != -1){
            fs.readFile(stylejava, function(err, data) {if (err) {weberror()} 
            res.writeHead(200, {'Content-Type': 'text/javascript'});
              res.write(data);
              return res.end();
          });
        }
          if(req.url.indexOf('.ttf') != -1){
            fs.readFile(stylejava, function(err, data) {if (err) {weberror()} 
            res.writeHead(200, {'Content-Type': 'aplication/font-sfnt'});
              res.write(data);
              return res.end();
          });
        }
        if(req.url.indexOf('.woff') != -1 || req.url.indexOf('.woff2') != -1){
          fs.readFile(stylejava, function(err, data) {if (err) {weberror()} 
          res.writeHead(200, {'Content-Type': 'embedded-opentype'});
            res.write(data);
            return res.end();
        });
      }
      
        
            function weberror(){
              res.writeHead(404, {'Content-Type': 'text/html'});
              return res.end("404 Not Found");
             }
             function websec(data) {
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.write(data);
              return res.end();
             }
      }).listen(port);
      console.log('working on port = ' + port);
      
}

module.exports.pages = pages;