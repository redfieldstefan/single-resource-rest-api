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

var testUser = {
  username: 'TestUser',
  email: 'testing@example.com',
  password: 'test123'
};

describe('Rant REST api, get and post requests', function() {

	after(function(done) {
		mongoose.connection.db.dropDatabase(function() {
			done();
		});
	});

	it('should create a new user', function(done){
		chai.request('localhost:3000')
			.post('/api/create_user')
			.send(testUser)
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(typeof res.body.token).to.eql('string');
        		done();
			});
	});

	it('should login a user and provide them a token', function(done){
		chai.request('localhost:3000')
			.post('/api/sign_in')
			.send(testUser.email, testUser.password)
			.end(function(err, res) {
		        expect(err).to.eql(null);
		        expect(typeof res.body).to.eql('object');
		        done();
     		 });
	});

});