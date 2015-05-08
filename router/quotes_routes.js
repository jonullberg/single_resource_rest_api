'use strict';

var Quote = require('../model/Quote');	// pulls in the Quote schema
var bodyparser = require('body-parser'); // requires in the bodyparser module

module.exports = function(router) {
	var fiveHundred = function(err, res) {
		console.log(err);
		return res.status(500).json({msg: 'internal server error'});
	};


	router.use(bodyparser.json());

	router.get('/quotes', function(req, res) {
		Quote.find({}, function(err, data) {
			if(err) {
				fiveHundred(err, res);
			}

			res.json(data);	
		});
	});

	router.post('/quotes', function(req, res) {
		var newQuote = new Quote(req.body);
		newQuote.save(function(err, data) {

			if(err){
				var inputTitle = Object.keys(err.errors)[0];
				var errPath = err.errors[inputTitle];
				var errMsg = {msg: 'invalid input for ' + errPath.path};
				if(errPath.kind === 'required') {
					var fourHundred = function(err, res) {
						console.log(err.errors[inputTitle].message);
						return res.status(400).json(errMsg);
					};
					return fourHundred(err, res);
					
				}
				fiveHundred(err, res);
			}
			res.json(data);
		});
	});

	router.put('/quotes/:id', function(req, res) {
		var updatedQuote = req.body;
		delete updatedQuote._id;
		console.log(req);

		Quote.update({_id: req.params.id}, updatedQuote, function(err) {
			if(err) {
				fiveHundred(err, res);
			}
			res.json({msg: 'success'});
		});
	});

	router.delete('/quotes/:id', function(req, res) {
		Quote.remove({'_id': req.params.id}, function(err, data) {
			if (err) {
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}

			res.json({msg: 'success'});
		});
	});
};