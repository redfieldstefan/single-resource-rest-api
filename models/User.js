'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var uuid = require('uuid');
var eat = require('eat');


var userSchema = new mongoose.Schema({
	username: {type:String, required: true, unique:true, trim: true},
	basic: {
		email:{type: String, required: true, unique: true, trim: true},
		password: String
	},
	specialId: String
});

userSchema.methods.generateId = function() {
	this.specialId = uuid.v1();
};


userSchema.methods.generateHash = function(password, callback) {
	 bcrypt.genSalt(8, function(err, salt) {
		bcrypt.hash(password, salt, null, function(err, hash) {
			if (err) {
				console.log(err);
			}
			callback(err, hash);
		});
	});
};

userSchema.methods.checkPassword = function(password, callback) {
	bcrypt.compare(password, this.basic.password, function(err, res) {
		if(err) {
			console.log(err);
		}
		callback(err, res);
	});
};

// userSchema.methods.generateToken = function(secret, callback) {
// 	eat.encode({id: this._id}, secret, callback);
// };

userSchema.methods.generateToken = function(secret, callback) {
	eat.encode({id: this.specialId}, secret,
		function(err, data) {
    	if (err) {
    		return callback(err);
    	}
    	return callback(null, data);
	  });
};

// userSchema.methods.generateToken = function(secret, callback) {
// 	eat.encode({id: this.}, secret, callback);
// };

module.exports = mongoose.model('User', userSchema);

