'use strict';

var mongoose = require('mongoose');

var rantSchema = mongoose.Schema({
	title: String,
	author: String,
	rant: String,
	recipient: String
});

module.exports = mongoose.model('Rant', rantSchema);