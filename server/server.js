var http = require("http");
var tweet = require("./trend-tracker");
var fs = require('fs');

function start() {
  console.log('Server has started.');
  tweet.searchTweets(); // Start tracking the tweets

  function onRequest(request, response) {
    tweet.setQuery('#HappyBirthdayMMS'); // Set the query parameter
    
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
  }

  var server = http.createServer(onRequest).listen(8888);

  var io = require('socket.io')(server); // Creating socket.io listener
  io.on('connection', function(socket){
    setInterval(function(){
      socket.emit('message',  {'message': tweet.getTweetInfo()}); // Send the updated tweet info continuously
    },30000);
  });
}

exports.start = start;
