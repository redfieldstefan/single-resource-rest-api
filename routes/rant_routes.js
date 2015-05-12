'use strict';

var bodyParser = require('body-parser');
var Rant = require('../models/Rant');
var Sql = require('sequelize');
var sql = new Sql('notes_dev', 'notes_dev', 'foobar123', {
	dialect: 'postgres'
});

moduel.exports = function (router) {
	router.use(bodyParser.json());

	router.post('/rants', function(req, res) {
		sql.sync()
		.then(function(){
			Rant.create(req.body)
		})
		 .then(function(data) {
		 	res.json(data);
		 })
		 .error(function(err) {
		 	console.log(err);
		 	res.status(500).json({msg: 'Internal server error'});
		 })
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
			})
		});
	});
}
