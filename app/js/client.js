'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var rantsApp = angular.module('rantsApp', ['ngRoute', 'ngCookies', 'base64']);

//services
require('./services/copy')(rantsApp);
require('./services/rest_resource')(rantsApp);
require('./auth/services/auth_service')(rantsApp);

//controllers
require('./rants/controllers/rants_controller')(rantsApp);
require('./auth/controllers/auth_controller')(rantsApp);

//directives
require('./rants/directives/rant_form_directive')(rantsApp);
require('./auth/directives/logout_directive')(rantsApp);

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
    .when('/', {
      redirectTo: '/create_user'
    })
    .otherwise({
      redirectTo: '/create_user'
    });
}]);