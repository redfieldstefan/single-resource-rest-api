'use strict';

var mongoose = require('mongoose');
var validate = require('mongoose-validator');

var titleValidator = [
	validate({
		validator: 'isLength',
		arguments: [1, 15],
		message: 'Rant title must be under 15 characters'
	})
];

var bodyValidator = [
	validate({
		validator: 'isLength',
		arguments: [1, 50],
		message: 'Rant must be under 50 characters'
	})
];

var rantSchema = mongoose.Schema({
	title: {type: String, required: 'title is required', validate: titleValidator},
	rant: {type: String, required: 'a rant is required', validate: bodyValidator},
	recipient: String
});

module.exports = mongoose.model('Rant', rantSchema);