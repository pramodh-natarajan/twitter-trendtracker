var http = require("http");
var tweet = require("./trend-tracker");

function start() {
  tweet.searchTweets();

  function onRequest(request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    var info = tweet.getTweetInfo();
    response.write(JSON.stringify(info));
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
