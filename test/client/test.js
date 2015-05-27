'use strict';

var expect = require('chai').expect;
var greet = require('../../app/js/greet');

describe('greet function', function() {
	it('should return a greeting', function() {
		expect(greet('Stefan')).to.eql('hello world from Stefan');
	});
});
