var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World! and good bye')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

/*
// Load the http module to create an http server.
var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {

  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8080);

var fs = require('fs');
fs.watch('example.txt', function() {
  console.log("file changed");
});

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8080/");*/
