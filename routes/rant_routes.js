'use strict';

var bodyParser = require('body-parser');
var Rant = require('../models/Rant');
var Sql = require('sequelize');
var sql = new Sql(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASS, {
	dialect: 'postgres'
});

module.exports = function (router) {
	router.use(bodyParser.json());

	router.post('/rants', function(req, res) {
		sql.sync()
		.then(function(){
			Rant.create(req.body)
			.then(function(data) {
		 	 res.json(data);
		 })
		 .error(function(err) {
		 	console.log(err);
		 	res.status(500).json({msg: 'Internal server error'});
		 });

		});
	});

	router.get('/rants', function(req, res) {
		sql.sync()
		.then(function() {
			Rant.all()
			.then(function(data){
				res.json(data);
			})
			.error(function(err){
				console.log(err);
		 		res.status(500).json({msg: 'Internal server error'});
			});
		});
	});

	router.put('/rants/:id', function(req, res) {
		var putID = req.params.id;
		sql.sync()
		.then(function(){
			Rant.find(putID)
			.then(function(item){
				item.updateAttributes({
					title: req.body.title,
					rant: req.body.rant
				});
			})
		 .then(function() {
		 	res.json({msg: 'Put request complete'});
		 })
		 .error(function(err) {
		 	console.log(err);
		 	res.status(500).json({msg: 'Internal server error'});
		 });
		});
	});

	router.delete('/rants/:id', function(req, res) {
		var id = req.params.id;
		sql.sync()
		.then(function(){
			Rant.find(id)
			.then(function(item){
				item.destroy();
			})
		 .then(function() {
		 	res.json({msg: 'delete request complete'});
		 })
		 .error(function(err) {
		 	console.log(err);
		 	res.status(500).json({msg: 'Internal server error'});
		 });
		});
	});


};
