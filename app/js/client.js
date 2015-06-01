'use strict';

require('angular/angular');

var rantsApp = angular.module('rantsApp', []);

require('../rants/controllers/rants.js')(rantsApp);