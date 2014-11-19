var exports = module.exports = {};
var fs = require("fs");
var messages = function(){
  return  JSON.parse(fs.readFileSync('messages.json', 'utf8'));
}

var getAllMessages = exports.getAllMessages = function(req, res) {
  return fs.readFileSync('messages.json', 'utf8');
}

var addNewMessage = exports.addNewMessage = function(req, res) {
  messages = messages();
  messages.results.unshift(req.body);
  fs.writeFile('messages.json', JSON.stringify(messages), function (err) {
    if (err) { throw err; }
    console.log('It\'s saved!');
  })
};


// var url = require("url");
// var queryString = require("querystring");
// var statusCode;
// var headers;
// var classesRegEx;
// var newMessages;



// var messages = {
//   results: [
//     {
//       message: "hello",
//       createdAt: "2013-10-07T16:22:03.280Z",
//       objectId: "teDOY3Rnpe",
//       roomname: "lobby",
//       text: "hello",
//       updatedAt: "2013-10-07T16:22:03.280Z",
//       username: "Jack"
//     },
//     {
//       message: "2nd message",
//       createdAt: "2013-10-07T16:23:03.280Z",
//       objectId: "teDOY3Rnpe",
//       roomname: "room1",
//       text: "hello",
//       updatedAt: "2013-10-07T16:22:03.280Z",
//       username: "otherPerson"
//     }
//   ]
// };



// var requestHandler = function(request, response) {

//   var theUrl = url.parse( request.url );

//   var queryObj = queryString.parse( theUrl.query );
//   // var obj = JSON.parse( queryObj.format );

//   console.log("Serving request type " + request.method + " for url " + request.url);

//   statusCode = 200;
//   headers = defaultCorsHeaders;
//   classesRegEx = /classes/;

//   if (theUrl.path === '/') {
//     response.writeHead(statusCode, headers);
//     response.end(
//     //serve up index.html
//     )
//   } else if (request.url.match(classesRegEx)) {
//     if (request.method === 'GET') {
//       response.writeHead(statusCode, headers);
//       response.end(JSON.stringify(messages));
//     }
//     if (request.method === 'POST' || request.method === 'OPTIONS') {
//       statusCode = 201;
//       response.writeHead(statusCode, headers);
//       request.on('data', function (chunk) {
//         messages.results.unshift(JSON.parse(chunk));
//       })
//       response.end('Posted')
//     }
//   } else {
//     statusCode = 404;
//     response.writeHead(statusCode, headers);
//     response.end('Not Found')
//   }
// };

// var defaultCorsHeaders = {
//   "access-control-allow-origin": "*",
//   "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "access-control-allow-headers": "content-type, accept",
//   "access-control-max-age": 10,
//   "Content-Type": "application/json"
// };


// exports.requestHandler = requestHandler;


      // var room = theUrl.pathname.substring(9);
      // if(!room || room === 'messages'){
      // }
      // else {
      //   newMessages = {
      //     results: messages.results.filter(function(item){
      //       return item.roomname === room;
      //     })
      //   }
      //   response.end(JSON.stringify(newMessages));
      // }
