# Twitter Trend Tracker

A real-time twitter search term tracker using node.js, socket.io and d3.js

# Server
* The server is built using [node.js](https://nodejs.org/) and [socket.io](http://socket.io/).

Files
-----
  * trend-tracker.js uses the [twit](https://www.npmjs.com/package/twit) module to continuously monitor what's going on with a twitter search term for every 30 seconds
  * server.js is responsible for starting up trend-tracker and serving clients using [socket.io](https://www.npmjs.com/package/socket.io) module

Config file format
------------------
  * Config.js needs to be placed in server folder to enable twit module. The format of this file is shown below.

  ```
  module.exports = {
      consumer_key: 'YOUR_CONSUMER_KEY'
    , consumer_secret: 'YOUR_CONSUMER_SECRET'
    , access_token: 'YOUR_ACCESS_TOKEN'
    , access_token_secret: 'YOUR_ACCESS_TOKEN_SECRET'
  }
  ```


# Client
* The client visualization is built using [D3.js](http://d3js.org/) and socket.io.
* The index file draws the visualization based on received JSON object from the server.

# Usage

  * Clone this repository
  * Run index.js using node 

  ```
  node twitter-trendtracker/server/index.js
  ```
  * Open http://localhost:8888/ in a browser.
  * Enter the query to track into the text box on the browser.
  * See the tweet count for that search term getting drawn continuously on the graph below.

