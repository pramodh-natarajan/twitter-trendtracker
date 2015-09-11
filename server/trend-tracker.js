var Twit = require('twit');
var config = require('./config')

var T = new Twit(config);

/* Get fresh tweets for every 30 seconds */
var timeout = 10000;

var maxid = function() {
  var d = new Date(Date.now());
  return d.getTime();
}

setInterval(function() {

  /* Parameters for search */
  var params = {
      q: '#onedirectionimsorryfor', since_id: maxid, count: 100, result_type:'recent'
  };

  /* Get the tweets based on parameters */
  T.get('search/tweets', params, function(err, data, response) {
    if(err) console.log(err);
    var statuses = data.statuses;

    if(statuses.length > 0)    {
      //var md = new Date(statuses[0].created_at);
      maxid = statuses[0].id;
      console.log(statuses[0].created_at);
    }
    //for(var i=0;i<statuses.length;i++) {
    //}
    console.log(statuses.length+ '\n');
  });
}, timeout);
