'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/notes_test';
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var app = 'localhost:3000';
chai.use(chaihttp);

var User = require('../model/User');

describe('The login API', function() {
	describe('Creating a user & log-in', function() {

		it('Should be able to create a user with a token', function(done) {
			chai.request(app)
				.post('/api/create_user')
				.send({ username: 'testUser', email: 'unique@example.com', password: 'test123' })
				.end(function(err, res) {
					expect(err).to.equal(null);
					expect(res.body).to.have.property('token');
					done();
				});
		});
		it('Should return an error when creating user with duplicate email', function(done) {
			chai.request(app)
				.post('/api/create_user')
				.send({ username: 'testUser2', email: 'unique@example.com', password: 'foobar123' })
				.end(function(err, res) {
					expect(err).to.equal(null);
					expect(res.body.msg).to.equal('Could not create user');
					expect(res.status).to.equal(500);
					done();
				});
		});

	});
	describe('Logging in', function() {
		it('should be able to sign-in a user', function(done) {
			chai.request(app)
				.get('/api/sign_in')
				.auth('unique@example.com', 'test123')
				.end(function(err, res) {
					expect(err).to.equal(null);
					expect(res.body).to.have.property('token');
					done();
				});
		});
		it('should not accept a sign-in with an incorrect password', function(done) {
			chai.request(app)
				.get('/api/sign_in')
				.auth('unique@example.com', 'test124')
				.end(function(err, res) {
					expect(res.status).to.equal(500);
					expect(res.error.text).to.equal('Wrong Password\n');
					done();
				});
		});

	});
	after(function(done) {
		mongoose.connection.db.dropDatabase(function() {
			done();
		});
	});
});
