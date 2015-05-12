'use strict';

var Sql = require('sequelize');
var sql = new Sql('notes_dev', 'notes_dev', 'foobar123', {
	dialect: 'postgres'
});

var Rant = module.exports = sql.define('Rant', {
	rantBody: Sql.STRING,
	title: Sql.STRING,
	rant: Sql.STRING
});



Rant.sync();

