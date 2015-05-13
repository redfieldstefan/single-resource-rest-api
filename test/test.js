'use-strict';

var Sql = require('sequelize');
var sql = new Sql(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASS, {
	dialect: 'postgres'
});
require('../server');


var chai = require('chai');
var chaihttp = require('chai-http');
var Rant = require('../models/Rant.js');
chai.use(chaihttp);
var expect = chai.expect;

describe('Rant REST api, get and post requests', function() {

	it('Should create a Rant object', function(done){
		chai.request('localhost:3000/')
			.post('api/rants')
			.send({title: 'Test', rant: 'Test rant'})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.title).to.eql('Test');
				expect(res.body.rant).to.eql('Test rant');
				expect(res.body).to.have.property('id');
				done();
			});
	});

	it('Should get an array of Rant objects', function(done){
		chai.request('localhost:3000/')
			.get('api/rants')
			.end(function(err, res) {
				expect(err).eql(null);
				expect(typeof res.body).to.eql('object');
				expect(Array.isArray(res.body)).to.eql(true);
				done();
			});
	});
});

describe('Needs Rants to alter', function() {

	var id;

	before(function(done) {
		sql.sync()
		.then(function(){
			Rant.create({title: 'Test', rant: 'Change This'})
				.then(function(rant){
					id = rant.id;
					done();
				});
		});
	}); 

	it('should replace a Rant', function(done){
		chai.request('localhost:3000')
			.put('/api/rants/' + id )
			.send({title: 'New Title', rant: 'Tests are great'})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.msg).to.eql('Put request complete');
				done();
			});	
			
	});

	it('should delete a Rant', function(done){
		chai.request('localhost:3000')
			.delete('/api/rants/' + id)
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.msg).to.eql('delete request complete');
				done();
			});	
	});

});