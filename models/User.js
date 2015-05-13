'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var userSchema = mongoose.Schema({
	username: {type:String, required: true, trim: true},
	basic: {
		email:{type: String, required: true, unique: true, trim: true},
		password:{type: String, min: 7, required: true, trim: true}
	}
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.checkPassword = function(password) {
	return bcrypt.compareSync(password, this.basic.password);
};

userSchema.methods.generateToken = function(secret, callback) {
	eat.encode({id: this._id}, secret, callback);
};

module.exports = mongoose.model('User', userSchema);

