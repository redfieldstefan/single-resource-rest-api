'use strict';

var greet = require('./greet');
document.write(greet('Stefan'));

var request = require('superagent');
var rantList = document.getElementById('rantList');

request('localhost:3000')
	.get('/api/rants')
	.end(function (err, res) {
		if(err) {
			return console.log(err)
		}

		var rants = JSON.parse(res.text);
		rants.forEach(function(rant) {
			var rantEl = document.createElement('li');
			rantEl.innerHMTL = rant.rantBody;
			rantList.append(rantEl);
		});
	})