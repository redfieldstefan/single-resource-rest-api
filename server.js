'use strict';

var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var app = express();
var port = 3000;

var rantRoutes = express.Router();
var userRoutes = express.Router();

process.env.APP_SECRET = process.env.APP_SECRET || 'changethischangethis';
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/rant_store');

app.use(passport.initialize());
require('./lib/passport_strat')(passport);
require('./routes/user_routes')(userRoutes, passport);
require('./routes/rant_routes')(rantRoutes);

app.use('/api', rantRoutes);
app.use('/api', userRoutes);

app.listen(process.env.port || port, function () {
	console.log('server running on port ' + (process.env.PORT || port));
});