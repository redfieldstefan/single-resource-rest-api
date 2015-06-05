'use strict';

module.exports = function (app) {
	app.directive('rantFormDirective', function() {
		return {
			restrict: 'A',
			replace: true,
			templateUrl: '/templates/directives/rant_form.html',
			scope: {
				save: '&', 
				reset: '&',
				buttonText: '=',
				labelText: '@',
				rant: '='
			},
			transclude: true
		};
	});
};