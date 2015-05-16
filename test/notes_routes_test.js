'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/notes_test';
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var Note = require('../model/Note');
var app = 'localhost:3000';

chai.use(chaihttp);


describe('notes API', function() {
	var myToken = '';
	before(function(done) {
		chai.request(app)
			.post('/api/create_user')
			.send({ username: 'testUser', email: 'test@example.com', password: 'test123' })
			.end(function(err, res) {
				myToken = res.body.token;
				return myToken, done();
			});
	});
	describe('getting and setting a note object', function() {
		it('should be able to get a note based on the user requesting', function(done) {
			chai.request(app)
				.get('/api/notes')
				.end(function(err, res) {
					expect(err).to.equal(null);
					done();
				});
		});
		it('should be able to write a note', function(done) {
			chai.request(app)
				.post('/api/notes')
				.send({eat: myToken, noteBody: 'Thats what she said'})
				.end(function(err, res) {
					expect(err).to.equal(null);
					expect(res.body.noteBody).to.equal('Thats what she said');
					expect(res.body).to.have.a.property('_id');
					done();
				});
		});
		describe('checking the validation', function() {
			it('should not accept posting a note without a note body', function(done) {
				chai.request(app)
					.post('/api/notes')
					.send({ eat: myToken, random: 'hey friend' })
					.end(function(err, res) {
 						expect(res.status).to.equal(500);
 						expect(res.error.text).to.equal('{"msg":"Internal Server Error"}');
						done();
					});
			});
		});
	});
	describe('Updating an already existing note', function() {
		var thisId = '';
		before(function(done) {
			chai.request(app)
				.post('/api/notes')
				.send({ eat: myToken, noteBody: 'This is a test note' })
				.end(function(err, res) {
					thisId = res.body._id;
					return thisId, done();
				});
		});

		it('should update an existing note', function(done) {
			chai.request(app)
				.put('/api/notes/' + thisId)
				.send({ eat: myToken, noteBody: 'I updated my test'})
				.end(function(err, res) {
					expect(err).to.equal(null);
					expect(res.body.msg).to.equal('success');
					thisId = res.body._id;
					return thisId, done();
				});
		});

	});
	describe('Deleting an already exisiting note', function() {
		var thisId = '';
		beforeEach(function(done) {
			chai.request(app)
				.post('/api/notes')
				.send({ eat: myToken, noteBody: 'This is my second test note' })
				.end(function(err, res) {
					thisId = res.body._id;
					return thisId, done();
				});
		});
		it('should be able to delete a note', function(done) {
			chai.request(app)
				.del('/api/notes/' + thisId)
				.send({ eat: myToken })
				.end(function(err, res) {
					expect(err).to.equal(null);
					expect(res.body.msg).to.equal('success');
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