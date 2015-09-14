# Twitter Trend Tracker

A real-time twitter search term tracker using node.js, socket.io and d3.js

# Server
* The server is built using [node.js](https://nodejs.org/) and [socket.io](http://socket.io/).

Files
-----
  * trend-tracker.js uses the [twit](https://www.npmjs.com/package/twit) module to continuously monitor what's going on with a twitter search term for every 30 seconds
  * server.js is responsible for starting up trend-tracker and serving clients using [socket.io](https://www.npmjs.com/package/socket.io) module

# Client
* The client visualization is built using [D3.js](http://d3js.org/) and socket.io.
* The index file draws the visualization based on received JSON object from the server.

# Usage

Just clone this repository, run index.js using node and see the visualization on the client (still under construction).

```
node server/index.js
```
