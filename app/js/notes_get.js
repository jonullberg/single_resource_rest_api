'use strict';

var request = require('superagent');
var noteList = document.getElementById('notelist');


module.exports = function() {
	request.get('/api/notes')
		.end(function(err, res) {
			if(err) return console.log(err);

			var notes = JSON.parse(res.text);

			notes.forEach(function(note) {
				var noteEl = document.createElement('li');
				noteEl.innerHTML = note.noteBody;
				noteList.appendChild(noteEl);
			});
		});
	};