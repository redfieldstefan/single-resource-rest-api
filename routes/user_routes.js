'use strict';

var User = require('../models/User');
var bodyparser = require('body-parser');
var user = new User();

module.exports = function(router, passport) {
	router.use(bodyparser.json());
	
	router.post('/create_user', function(req, res) {
		var userData = JSON.parse(JSON.stringify(req.body));
		delete userData.email;
		delete userData.password;
		var newUser = new User(userData);
		newUser.basic.email = req.body.email;
		newUser.generateHash(req.body.password, function(err, hash) {
			if(err){
				console.log(err);
				return res.status(500).json({msg: "Could not create new user"});
			}
			newUser.basic.password = hash;
		});
		newUser.generateId();
		newUser.save(function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'Could not create new user'});
			}

			newUser.generateToken(process.env.APP_SECRET, function(err, token) {
				if(err){
					console.log(err);
					return res.status(500).json({msg:'Error generating token'});
				}
				res.json({token: token});
			});
		});
	});

	router.get('/sign_in', passport.authenticate('basic', {session: false}), function(req, res){
		req.user.generateToken(process.env.APP_SECRET, function(err, token){
			if(err) {
				console.log(err);
				return res.status(500).json({msg: 'error generating token'});
			}
			res.json({token: token});
		});
	});
};