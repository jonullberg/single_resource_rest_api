'use strict';

var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
	noteBody: {type: String, required: true}
});

module.exports = mongoose.model('Note', noteSchema);