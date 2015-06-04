'use strict';

module.exports = function(app) {
	app.directive('simpleDirective', function() {
		return {
			restrict: 'AC', //RESTRICT IS REQUIRED IN EVERY DIRECTIVE
			template: '<h2>{{someVal}}</h2><input type = "text" data-ng-model="someVal">',
			scope: {} //IMMEDIATELY SETS A SCOPE OBJECT SO THE INITIATED VARIABLE DOESNT GO SEARCHING FOR ONE ON DIFFERENT LEVELS
		}
	});
};


// ECMA

// 	Element
// 	Class
//coMment
// 	Attribute