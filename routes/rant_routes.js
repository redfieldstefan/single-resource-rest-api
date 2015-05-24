'use strict';

var Rant = require('../models/Rant');
var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);

module.exports = function(router) {
	router.use(bodyparser.json());

	router.get('/rants', function(req, res) {
		Rant.find({}, function(err, data) {
			if(err){
				console.log(err);
				return res.status(500).json({msg: 'Uh oh! There must have been a server error somewhere.'});
			} 
			res.json(data);
		});
	});

	router.post('/rants', eatAuth, function(req, res){
		var newRant = new Rant(req.body);
		newRant.save(function(err, data){
			if(err){
				console.log(err);
				return res.status(500).json({msg: 'Uh oh! There must have been a server error somewhere.'});
			}
			res.json(data);
		});
	});

	router.put('/rants/:id', function(req, res) {
		var update = req.body;
		delete update._id;

		Rant.update({'_id': req.params.id}, update, function(err, data) {
			if(err){
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}
			res.json({msg: "Put: Nailed it"});
		});
	});

	router.patch('/rants/:id', function(req, res) {
		var update = req.body;
		delete update._id;

		Rant.update({'_id': req.params.id}, update, function(err, data) {
			if(err){
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}
			res.json({msg: "Patch: Nailed it"});
		});
	});

	router.delete('/rants/:id', function(req, res) {
		Rant.remove({'_id': req.params.id}, function(err, data) {
			if(err){
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}
			res.json({msg: 'Delete: Nailed it'});
		});
	});
};
