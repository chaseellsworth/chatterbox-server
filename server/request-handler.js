var exports = module.exports = {};
/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var url = require("url");
var queryString = require("querystring");
// var statusCode;
// var headers;
var classesRegEx;
var newMessages;

var requestHandler = function(request, response) {

  var theUrl = url.parse( request.url );

  var queryObj = queryString.parse( theUrl.query );


  // var obj = JSON.parse( queryObj.format );


  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.



  console.log("Serving request type " + request.method + " for url " + request.url);


  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  // headers['Content-Type'] = "application/json";

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

  classesRegEx = /classes/;

  if (request.url.match(classesRegEx)) {

    if (request.method === 'GET') {
      var room = theUrl.pathname.substring(9);
      response.writeHead(statusCode, headers);
      if(!room || room === 'messages'){
        response.end(JSON.stringify(messages));
      } else {
        newMessages = {
          results: messages.results.filter(function(item){
            return item.roomname === room;
          })
        }
        response.end(JSON.stringify(newMessages));
      }
    }
    if (request.method === 'POST' || request.method === 'OPTIONS') {
      statusCode = 201;
      console.log(statusCode)
      response.writeHead(statusCode, headers);
      request.on('data', function (chunk) {
        messages.results.unshift(JSON.parse(chunk));
      })
      response.end('Posted')
    }
  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end('Not Found')
  }

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  "Content-Type": "application/json" // Seconds.
};

var messages = {
  results: [
    {
      message: "hello",
      createdAt: "2013-10-07T16:22:03.280Z",
      objectId: "teDOY3Rnpe",
      roomname: "lobby",
      text: "hello",
      updatedAt: "2013-10-07T16:22:03.280Z",
      username: "gary"
    },
    {
      message: "2nd message",
      createdAt: "2013-10-07T16:23:03.280Z",
      objectId: "teDOY3Rnpe",
      roomname: "room1",
      text: "hello",
      updatedAt: "2013-10-07T16:22:03.280Z",
      username: "otherPerson"
    }
  ]
};



exports.requestHandler = requestHandler;
