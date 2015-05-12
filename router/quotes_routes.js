'use strict';

var Quote = require('../model/Quote');	// pulls in the Quote schema
var bodyparser = require('body-parser'); // requires in the bodyparser module
var Sql = require('sequelize');
var sql = new Sql('notes_dev', 'notes_dev', 'foobar123', {
	dialect: 'postgres'
});

module.exports = function(router) {
	var fiveHundred = function(err, res) {
		console.log(err);
		return res.status(500).json({msg: 'internal server error'});
	};


	router.use(bodyparser.json());

	router.get('/quotes', function(req, res) {
		sql.sync()
			.then(function() {
				Quote.all()
				.then(function(data) {
					res.json(data);
				})
				.error(function(err) {
					console.log(err);
					res.status(500).json({msg: 'server error'});
				});
			});
	});

	router.post('/quotes', function(req, res) {
		sql.sync()
		.then(function() {
			Quote.create(req.body)
			.then(function(data) {
				res.json(data);
			})
			.error(function(err) {
				console.log(err);
				res.status(500).json({msg: 'server error'});
			});
		});
	});

	router.put('/quotes/:id', function(req, res) {
		sql.sync();
		Quote.find({ where: { id: req.params.id } })
		.then(function(quote) {
			quote.update(req.body);
		})
		.then(function() {
			res.json({msg: 'success'});
		})
		.error(function(err) {
			console.log(err);
			res.status(500).json({ msg: 'server error' });
		});
	});

	router.delete('/quotes/:id', function(req, res) {
		sql.sync();
		Quote.find({ where: { id: req.params.id } })
		.then(function(quote) {
			console.log(quote);
			quote.destroy();
		})
		.then(function() {
			res.json({ msg: 'success' });
		})
		.error(function(err) {
			console.log(err);
			res.status(500).json({ msg: 'server error' });
		});
	});
};