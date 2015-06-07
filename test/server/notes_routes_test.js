'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/notes_test';
require('../../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var Note = require('../../models/Note');
var app = 'localhost:3000';

chai.use(chaihttp);

describe('notes API', function() {
	var myToken = '';
	var testNoteId = '';

	before(function(done) {
		chai.request(app)
			.post('/api/create_user')
			.send({ username: 'testUser', email: 'test@example.com', password: 'test123' })
			.end(function(err, res) {
				myToken = res.header.token;
				done();
			});
	});

	after(function(done) {
		mongoose.connection.db.dropDatabase(function() {
			done();
		});
	});

	describe('Getting and setting a note object', function() {

		it('Should be able to get a note based on the user requesting', function(done) {
			chai.request(app)
				.get('/api/notes')
				.set({ eat: myToken })
				.end(function(err, res) {
					expect(err).to.equal(null);
					done();
				});
		});

		it('should be able to write a note', function(done) {
			chai.request(app)
				.post('/api/notes')
				.set({ eat: myToken})
				.send({ noteBody: 'First test note' })
				.end(function(err, res) {
					expect(err).to.equal(null);
					expect(res.body.noteBody).to.equal('First test note');
					expect(res.body).to.have.a.property('_id');
					expect(res.body).to.have.a.property('authorId');
					testNoteId = res.body._id;
					done();
				});
		});

		describe('checking the validation', function() {
			it('should not accept posting a note without a noteBody', function(done) {
				chai.request(app)
					.post('/api/notes')
					.set({ eat: myToken })
					.send({ noteBody: undefined })
					.end(function(err, res) {
 						expect(res.status).to.equal(500);
						done();
					});
			});
		});
	});
	describe('updating and deleting an already existing note', function() {

		it('should update an existing note', function(done) {
			chai.request('localhost:3000')
				.put('/api/notes/' + testNoteId)
				.set({ eat: myToken })
				.send({noteBody: 'I updated my test'})
				.end(function(err, res) {
					expect(err).to.equal(null);
					expect(res.body.msg).to.equal('success');
					done();
				});
		});

		it('should be able to delete a note', function(done) {
			chai.request(app)
				.del('/api/notes/' + testNoteId)
				.set({ eat: myToken })
				.end(function(err, res) {
					expect(err).to.equal(null);
					expect(res.body.msg).to.equal('success');
					done();
				});
		});
	});


});