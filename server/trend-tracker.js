var Twit = require('twit');
var config = require('./config')

var T = new Twit(config);

/* Get fresh tweets for every 30 seconds */
var timeout = 30000;

/* Tweets since the tweet with this id */
var since = 1;

var tweetInfo = {
  count:0,
  period:0
};

function dateMillis() {
  var d = new Date(Date.now());
  return d.getTime();
}

/* This function runs seperately and looks for new tweets in given timeout interval */
function searchTweets() {
  setInterval(function() {
    console.log('SEARCHING...');
    /* Parameters for search */
    var params = {
        q: 'Chandigarh', since_id: since, count: 100, result_type:'recent'
    };

    /* Get the tweets based on parameters */
    T.get('search/tweets', params, function(err, data, response) {
      if(err) console.log(err);
      var statuses = data.statuses;

      /* Check if there are any fresh tweets available */
      if(statuses.length > 0)    {
        since = statuses[0].id;
      }

      /* Update return parameters */
      tweetInfo.count = statuses.length;
      tweetInfo.period = dateMillis();
    });
  }, timeout);
}

/* This function returns the latest stats */
function getTweetInfo() {
  return tweetInfo;
}

exports.searchTweets = searchTweets;
exports.getTweetInfo = getTweetInfo;
