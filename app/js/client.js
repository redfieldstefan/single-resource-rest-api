'use strict';

require('angular/angular');

var rantsApp = angular.module('rantsApp', []);

//SERVICES
require('./services/rest_resource.js')(rantsApp);
require('./services/copy')(rantsApp);

//CONTROLLERS
require('./rants/controllers/rants.js')(rantsApp);

//DIRECTIVES
require('./directives/rant_form_directive.js')(rantsApp);