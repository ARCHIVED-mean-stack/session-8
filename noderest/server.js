// var http = require('http');

// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello New York\n');
// }).listen(3001);

// console.log('Server running at http://localhost:3001/');


var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Hello Seattle\n');
});

app.listen(3001);
console.log('Server running at http://localhost:3001/');