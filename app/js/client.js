'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var rantsApp = angular.module('rantsApp', ['ngRoute', 'ngCookies', 'base64']);

//SERVICES
require('./services/rest_resource.js')(rantsApp);
require('./services/copy')(rantsApp);
// require('./auth/services/auth')(rantsApp);

//CONTROLLERS
require('./rants/controllers/rants.js')(rantsApp);
require('./auth/controllers/auth_controller.js')(rantsApp)

//DIRECTIVES
require('./directives/rant_form_directive.js')(rantsApp);
// require('./auth/directives/logout_direction')(rantsApp);

rantsApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/rants', {
			templateUrl: 'templates/views/rants_view.html',
			controller: 'rantsController'
		})
		.when('/sign_in', {
			templateUrl: 'templates/views/sign_in_view.html',
			controller: 'authController'
		})
		.when('/create_user', {
			templateUrl: 'templates/views/create_user_view.html',
			controller: 'authController'
		})
		.otherwise({
			redirectTo: '/create_user'
		})
}]);

