'use strict';

var Basic = require('passport-http').BasicStrategy;
var User = require('../models/User');

module.exports = function(passport) {
	passport.use('basic', new Basic({}, function(email, password, done) {
		User.findOne({'basic.email': email}, function(err, user) {
			
			if(err) {
				return done('Database error');
			}
			if(!user) {
				return done('No such user');
			}
			
			user.checkPassword(password, function(err, res) {
				
				if (err) {
					console.log(err);
				}
				if (res === false) {
					return done('Wrong Password');
				}
				if(res === true) {
					return done(null, user);
				}
			});
			
		});
	}));
};