var http = require("http");
var tweet = require("./trend-tracker");
var fs = require('fs');

function start() {
  tweet.searchTweets();

  function onRequest(request, response) {
    var responsefile = __dirname;
    responsefile = responsefile.substring(0, responsefile.length - 6) + 'client/index.html';
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
    /*
    response.writeHead(200, {"Content-Type": "text/html"});
    var info = tweet.getTweetInfo();
    response.write(JSON.stringify(info));
    response.end();
    */
  }

  var server = http.createServer(onRequest).listen(8888);

  var io = require('socket.io')(server);
  io.on('connection', function(socket){
    setInterval(function(){
      socket.emit('message',  {'message': tweet.getTweetInfo()});
    },30000);
  });
}

exports.start = start;
