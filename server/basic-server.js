var http = require("http");
var handler = require("./request-handler.js");


var express = require("express");
var bodyParser = require('body-parser')
var app = express();
app.set('trust proxy', 'loopback')
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Content-Type", "application/json")
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
// app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies
app.listen(3000);
app.get('/', function(req, res) {
  res.send('This is the default room')
});


app.get('/classes/', function(req, res) {
  res.send(handler.getAllMessages(req,res))
});

//Some other page
app.get('/classes/room1', function(req, res) {
  res.send('Hello World!')
});

//I can respond to a form post
app.post('/classes', function(req, res) {
  console.log(req.body);
  handler.addNewMessage(req, res)
  res.send("posted!")
});

// var port = 3000;

// var ip = "127.0.0.1";

// var server = http.createServer(handler);

// console.log("Listening on http://" + ip + ":" + port);

// server.listen(port, ip);

//Express Stuff//

/* Import node's http module: */


// Every server needs to listen on a port with a unique number. The
// standard port for HTTP servers is port 80, but that port is
// normally already claimed by another server and/or not accessible
// so we'll use a standard testing port like 3000, other common development
// ports are 8080 and 1337.


// For now, since you're running this server on your local machine,
// we'll have it listen on the IP address 127.0.0.1, which is a
// special address that always refers to localhost.


// We use node's http module to create a server.
//
// The function we pass to http.createServer will be used to handle all
// incoming requests.
//
// After creating the server, we will tell it to listen on the given port and IP. */


// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.

