'use strict';


var expect = require('chai').expect;
var greet = require('../../app/js/greet');

describe('greet function', function() {

	it('should let you know who is ranting', function() {
		expect(greet('Stefan')).to.eql('Here we get to view Rants brought to you by Stefan. Each rant has a title, a rant, and a recipient. Titles and Rants are required');
	});
});
