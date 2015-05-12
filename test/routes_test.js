'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var Quote = require('../model/Quote');
var Sql = require('sequelize');
var sql = new Sql('notes_dev_test', 'notes_dev_test', 'foobar123', {
	dialect: 'postgres'
});

chai.use(chaihttp);

require('../server');

describe('quotes API', function() {
	after(function(done) {
		Quote.drop();
		done();
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
				.send({writer: 'Michael Scott', source: 'The Office', quoteBody: 'Thats what she said'})
				.end(function(err, res) {
					expect(err).to.equal(null);
					expect(res.body.source).to.equal('The Office');
					expect(res.body).to.have.a.property('id');
					done();
				});
		});
	});
	describe('updating and deleting an already existing note', function() {
		beforeEach(function(done) {
			Quote.create({ writer: 'Testy', source: 'a test', quoteBody: 'This is only a test' });
			done();
		});

		it('should update an existing quote', function(done) {
			chai.request('localhost:3000')
				.put('/api/quotes/1')
				.send({quoteBody: 'I updated my test'})
				.end(function(err, res) {
					expect(err).to.equal(null);
					expect(res.body.msg).to.equal('success');
					done();
				});
		});

		it('should be able to delete a note', function(done) {
			chai.request('localhost:3000')
				.del('/api/quotes/1')
				.end(function(err, res) {
					expect(err).to.equal(null);
					expect(res.body.msg).to.equal('success');
					done();
				});
		});
	});


});