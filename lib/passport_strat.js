'use strict';

var Basic = require('passport-http').BasicStrategy;
var User = require('../models/User');

module.exports = function(passport) {
	passport.use('basic', new Basic({}, function(email, password, done) {
		User.findOne({'basic.email': email}, function(err, data) {
			if(err) {
				return done('Database error');
			}
			if(!User) {
				return done('No such user');
			}
			if(!User.checkPassword(password)){
				return done('Wrong password');
			}

			return done(null, user);
		});
	}));
};