# Twitter Trend Tracker

- This application tracks a twitter search term and visualizes it's popularity over a period of time.

Server
------
* The server is built using node.js ('twit' package). 
* It continuously finds out the number of tweets made for a given search term over a period of 30 seconds.
* A JSON array with the tweet counts and time period is sent as a response.

Client
------
* The client visualization is built using D3.js
* It processes the JSON array sent from the server and uses it to visualize (track) the trend.
