'use strict';

var eat = require('eat');
var User = require('../models/User');
	//FAIL CASES
	//1: not a token
	//2: invalid token
		//wrong token
		//token expires
		//decryption failed
	//3: no user matches token
	//4: database error

module.exports = function(secret) {
	return function(req, res, next) {
		var token = req.headers.token || req.body.token;
		if(!token){
			console.log('Unauthorized: No token in reqest');
			return res.status(401).json({msg:'Not authorized'});
		}

		eat.decode(token, secret, function(err, decoded) {
			if(err){
				console.log(err);
				return res.status(401).json({msg: 'Not authorized'});
			}

			User.findOne({specialId: decoded.id}, function(err, user) {
				if(err) {
					console.log(err);
					return res.status(401).json({msg: 'Not authorized'});
				}

				if(!user) {
					console.log('no user found for that token');
					return res.status(401).json({msg: 'Not authorized'});
				}

				req.user = user;
				next();
			});

		});
	};
};
