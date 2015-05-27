'use strict';

var greet = require('./greet');
document.write(greet('Stefan Redfield'));
var request = require('superagent');
var rantList = document.getElementById('rantList');
var body = document.body;

 request
	.get('/api/rants')
	.end(function (err, res) {
		if(err) {
			return console.log(err)
		}

		var rants = JSON.parse(res.text);
		rants.forEach(function(rant) {
			console.log(rant.rant);
			var rantEl = document.createElement('li');
			// var test = document.createTextNode(rant.title + ': ' + rant.rant);
			rantEl.innerHTML = rant.title + ': ' + rant.rant;
			// rantEl.appendChild(test);
			rantList.appendChild(rantEl);
		});
	});
