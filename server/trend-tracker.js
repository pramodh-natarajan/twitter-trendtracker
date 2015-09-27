var Twit = require('twit');
var config = require('./config')

var T = new Twit(config);

/* Get fresh tweets for every 30 seconds */
var timeout = 10000;
var query = '';

/* Tweets since the tweet with this id */
var since = 1;

var tweetQueue = [];

function dateMillis() {
  var d = new Date(Date.now());
  return d.getTime();
}

/* This function runs seperately and looks for new tweets in given timeout interval */
function searchTweets() {
  setInterval(function() {
    /* Parameters for search */
    if(query != '') {
      var params = {
          q: query, since_id: since, count: 100, result_type:'recent'
      };

      /* Get the tweets based on parameters */
      T.get('search/tweets', params, function(err, data, response) {
        if(err) console.log(err);
        var statuses = data.statuses;

        /* Check if there are any fresh tweets available */
        if(statuses.length > 0)    {
          since = statuses[0].id;
        }

        tweetQueue.push({count:statuses.length, period:tweetQueue.length});
        if(tweetQueue.length > 20) {
          tweetQueue.shift();
          for(var i=0; i<tweetQueue.length; i++) {
            tweetQueue[i].period--;
          }
        }
      });
    }
  }, timeout);
}

function setQuery(q) {
  query = q;
}

function getQuery() {
  return query;
}
/* This function returns the latest stats */
function getTweetInfo() {
  return tweetQueue;
}
function clearTweetQueue() {
  tweetQueue = [];
}

exports.searchTweets = searchTweets;
exports.getTweetInfo = getTweetInfo;
exports.setQuery = setQuery;
exports.getQuery = getQuery;
exports.clearTweetQueue = clearTweetQueue;
