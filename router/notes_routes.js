'use strict';

var Note = require('../model/Note');	// pulls in the Note schema
var bodyparser = require('body-parser'); // requires in the bodyparser module
var eat_auth = require('../lib/eat_auth')(process.env.APP_SECRET); // Requires in the module to check for token auth

module.exports = function(router) {
	router.use(bodyparser.json());

	router.get('/notes', eat_auth, function(req, res) {
		Note.find({ authorId: req.user._id }, function(err, data) {
			if(err) {
				console.log(err);
				return res.status(500).json({ msge: 'internal server error' });
			}

			res.json(data);	
		});
	});

	router.post('/notes', eat_auth, function(req, res) {
		var newNote = new Note(req.body);
		newNote.authorId = req.user._id;
		newNote.save(function(err, data) {

			if(err){
				console.log(err);
				return res.status(500).json({ msg: 'Internal Server Error' });
			}
			res.json(data);
		});
	});

	router.put('/notes/:id', eat_auth, function(req, res) {
		var updatedNote = req.body;
		delete updatedNote._id;

		Note.update({ '_id': req.params.id }, updatedNote, function(err) {
			if(err) {
				console.log(err);
				return res.status(500).json({ msg: 'Internal Server Error' });
			}
			res.json({ msg: 'success' });
		});
	});

	router.delete('/notes/:id', eat_auth, function(req, res) {
		Note.remove({ '_id': req.params.id }, function(err, data) {
			if (err) {
				console.log(err);
				return res.status(500).json({msg: 'internal Server Error'});
			}

			res.json({ msg: 'success' });
		});
	});
};