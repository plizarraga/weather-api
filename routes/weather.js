var express = require('express');
var request = require('request');
var router = express.Router();

/* GET weather by city */
router.get('/weather/:city/', function(req, res){
	var	url = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\""+req.params.city+"\")&format=json&env=store://datatables.org/alltableswithkeys"
	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    res.send(JSON.parse(body));
	  }
	})
});

module.exports = router;
