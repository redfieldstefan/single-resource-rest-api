'use strict';

var Rant = require('../models/Rant');
var bodyparser = require('body-parser');

module.exports = function(router) {
	router.use(bodyparser.json());

	router.get('/rants', function(req, res) {
		note.find({}, function(err, data) {
			if(err){
				console.log(err);
				return res.status(500).json({msg: 'Uh oh! There must have been a server error somewhere.'});
			} 

			res.json(data);
		});
	});

	router.post('/rants', function(req, res){
		var newRant = new Rant(req.body);
		newRant.save(function(err, data){
			if(err){
				console.log(err);
				return res.status(500).json({msg: 'Uh oh! There must have been a server error somewhere.'});
			}

			res.json(data);
		});
	});
});



}