'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var Quote = require('../model/Quote');

chai.use(chaihttp);

process.env.MONGOLAB_URI = 'mongodb://localhost/test_quotes_db';
require('../server');

describe('quotes API', function() {
	after(function(done) {
		mongoose.connection.db.dropDatabase(function() {
			done();
		});
	});
	describe('getting and setting a quote object', function() {
		it('should be able to get a quote', function(done) {
			chai.request('localhost:3000')
				.get('/api/quotes')
				.end(function(err, res) {
					expect(err).to.equal(null);
					done();
				});
		});
		it('should be able to write a quote', function(done) {
			chai.request('localhost:3000')
				.post('/api/quotes')
				.send({writer: 'Jonathan', source: 'my brain', quoteBody: 'YOLO'})
				.end(function(err, res) {
					expect(err).to.equal(null);
					expect(res.body.source).to.equal('my brain');
					expect(res.body).to.have.a.property('_id');
					done();
				});
		});
		describe('checking the validation', function() {
			it('should not accept posting a note without a writer', function(done) {
				chai.request('localhost:3000')
					.post('/api/quotes')
					.send({source: 'my Brain', quoteBody: 'Tubthumping'})
					.end(function(err, res) {
 						expect(res.status).to.equal(400);
 						expect(res.error.text).to.equal('{"msg":"invalid input for writer"}')
						done();
					});
			});
			it('should not accept posting a note without a quote body', function(done) {
				chai.request('localhost:3000')
					.post('/api/quotes')
					.send({writer: 'Jonathan', source: 'my Brain'})
					.end(function(err, res) {
 						expect(res.status).to.equal(400);
 						expect(res.error.text).to.equal('{"msg":"invalid input for quoteBody"}')
						done();
					});
			});
		});
	});
	describe('updating and deleting an already existing note', function() {
		beforeEach(function(done) {
			var testQuote = new Quote({writer: 'Tester', source: 'an SAT test', quoteBody: 'Test my testing tester'});
			testQuote.save(function(err, data) {
				if(err) throw err;
				this.testQuote = data;
				done();
			}.bind(this));
		});

		it('should update an existing quote', function(done) {
			chai.request('localhost:3000')
				.put('/api/quotes/' + this.testQuote._id)
				.send({quoteBody: 'I updated my test'})
				.end(function(err, res) {
					expect(err).to.equal(null);
					expect(res.body.msg).to.equal('success');
					done();
				});
		});

		it('should be able to delete a note', function(done) {
			chai.request('localhost:3000')
				.del('/api/quotes/' + this.testQuote._id)
				.end(function(err, res) {
					expect(err).to.equal(null);
					expect(res.body.msg).to.equal('success');
					done();
				});
		});
	});


});