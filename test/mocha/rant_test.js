'use-strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/rant_test';
require('../../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var Rant = require('../../models/Rant.js');
var User = require('../../models/User.js');
var user = new User();
var eat = require('eat');
chai.use(chaihttp);
var expect = chai.expect;

describe('Rant REST api, get and post requests', function() {

	var testToken;
	before(function(done){
		var testUser = new User({"username":"testUser", "basic.email":"testUser@example.com", "basic.password":"test123"});
		testUser.generateId();
		testUser.save(function(err, data) {
			if(err) {
				throw err;
			}
			testUser.generateToken(process.env.APP_SECRET, function(err, token) {
				if(err){
					console.log(err);
					return res.status(500).json({msg:'Error generating token'});
				}
				testToken = "'" + token + "'";
				console.log(testToken);
				done();
			});
		});
	});

	after(function(done) {
		mongoose.connection.db.dropDatabase(function() {
			done();
		});
	});

	it('Should create a Rant object', function(done){
		chai.request('localhost:3000/')
			.post('api/rants')
			.send({title: 'Test', rant: 'Test rant', eat: testToken})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.title).to.eql('Test');
				expect(res.body.rant).to.eql('Test rant');
				expect(res.body).to.have.property('_id');
				done();
			});
	});

	it('Should get an array of Rant objects', function(done){
		chai.request('localhost:3000/')
			.get('api/rants')
			.send({eat: testToken})
			.end(function(err, res) {
				expect(err).eql(null);
				expect(typeof res.body).to.eql('object');
				expect(Array.isArray(res.body)).to.eql(true);
				done();
			});
	});
});

describe('Needs Rants to alter', function() {

	var testToken;
	before(function(done){
		var testUser = new User({"username":"testUser", "basic.email":"testUser@example.com", "basic.password":"test123"});
		testUser.generateId();
		testUser.save(function(err, data) {
			if(err) {
				throw err;
			}
			testUser.generateToken(process.env.APP_SECRET, function(err, token) {
				if(err){
					console.log(err);
					return res.status(500).json({msg:'Error generating token'});
				}
				testToken = "'" + token + "'";
				console.log(testToken); 
				done();
			});
		});
	});

	beforeEach(function(done) {
		var rantTest = new Rant({title: 'Test', rant: 'Neat tests'});
		rantTest.save(function(err, data) {
			if(err) {
				throw err;
			}
			this.rantTest = data;
			done();
		}.bind(this));
	});

	after(function(done) {
		mongoose.connection.db.dropDatabase(function() {
			done();
		});
	});

	it('should replace a Rant', function(done){
		chai.request('localhost:3000')
			.put('/api/rants/' + this.rantTest._id)
			.send({title: 'New Title', rant: 'Tests are great', eat: testToken})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.msg).to.eql('Put: Nailed it');
				done();
			});
	});

	it('should update a Rant', function(done){
		chai.request('localhost:3000')
			.patch('/api/rants/' + this.rantTest._id)
			.send({title: 'New Title', rant: 'Tests are more than great'})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.msg).to.eql('Patch: Nailed it');
				done();
			});
	});

	it('should delete a Rant', function(done){
		chai.request('localhost:3000')
			.delete('/api/rants/' + this.rantTest._id)
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.msg).to.eql('Delete: Nailed it');
				done();
			});
	});

});
