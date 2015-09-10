var Twit = require('twit');
var config = require('./config')

var T = new Twit(config);

/* Get fresh tweets for every 30 seconds */
var timeout = 30000;

function datestring () {
  var d = new Date(Date.now() - timeout);
  return d.getUTCFullYear()   + '-'
     +  (d.getUTCMonth() + 1) + '-'
     +   d.getDate();
};

setInterval(function() {

  /* Parameters for search */
  var params = {
      q: '#iphonecharger', since: datestring(), count: 100
  };

  /* Get the tweets based on parameters */
  T.get('search/tweets', params, function(err, data, response) {
    if(err) console.log(err);
    var statuses = data.statuses;
    console.log(statuses.length);
    console.log(params.since);

    /*for(var i=0; i<statuses.length; i++) {
        console.log(statuses[i].text);
    }*/

  });
}, timeout);
