var http = require("http");
var tweet = require("./trend-tracker");
var fs = require('fs');
var url = require("url");

function start() {
  console.log('Server has started.');
  tweet.searchTweets(); // Start tracking the tweets

  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('Request for - '+pathname+' received.');
    if(pathname == '/') {
      var responsefile = __dirname;
      responsefile = responsefile.substring(0, responsefile.length - 6) + 'client/index.html'; // Serve this file to the browser when request is made
      fs.readFile(responsefile,'utf8', function(error, data){
          if (error){
              response.writeHead(404);
              response.write("Page not found - 404");
          }
          else{
              response.writeHead(200, {"Content-Type": "text/html"});
              response.write(data);
          }
          response.end();
      });
    } else if (pathname == "/js/clientd3andsocketio.js") {
      fs.readFile(__dirname + '/js/clientd3andsocketio.js', 'utf8', function(error, data){
          if (error){
              response.writeHead(404);
              response.write("Page not found - 404");
          }
          else{
              response.writeHead(200, {"Content-Type": "text/javascript"});
              response.write(data);
          }
          response.end();
      });
    }
  }

  var server = http.createServer(onRequest).listen(8888);

  var io = require('socket.io')(server); // Creating socket.io listener
  io.on('connection', function(socket){
    setInterval(function(){
      socket.emit('message',  {'message': tweet.getTweetInfo()}); // Send the updated tweet info continuously
    },10000);
    socket.on('requestedQuery', function (data) {
      var currentquery = tweet.getQuery();
      var newquery = data.query;
      if(currentquery != newquery) {
        tweet.clearTweetQueue(); // Clear the tweet queue
        tweet.setQuery(newquery); // Set the query parameter
      }
    });
  });
}

exports.start = start;
