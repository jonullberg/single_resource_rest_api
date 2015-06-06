'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/notes_test';
require('../../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var app = 'localhost:3000';
chai.use(chaihttp);

var User = require('../../models/User');

describe('The login API', function() {

	after(function(done) {
		mongoose.connection.db.dropDatabase(function() {
			done();
		});
	});

	describe('Creating a user and logging in', function() {
		it('Should be able to create a user with a token', function(done) {
			chai.request(app)
				.post('/api/create_user')
				.send({ username: 'firstTestUser', email: 'test@example.com', password: 'foobar123' })
				.end(function(err, res) {
					expect(err).to.equal(null);
					expect(res.body).to.have.property('token');
					done();
				});
		});

		it('Should be able to sign-in a user', function(done) {
			chai.request(app)
				.get('/api/sign_in')
				.auth('test@example.com', 'foobar123')
				.end(function(err, res) {
					expect(err).to.equal(null);
					expect(res.body).to.have.property('token');
					done();
				});
		});

		it('Should not accept a sign-in with an incorrect password', function(done) {
			chai.request(app)
				.get('/api/sign_in')
				.auth('test@example.com', 'wrongPassword')
				.end(function(err, res) {
					expect(res).to.have.status(500);
					expect(res.error.text).to.equal('wrong password\n');
					done();
				});
		});
	});
});