'use strict';

var mongoose = require('mongoose');

var quoteSchema = mongoose.Schema({
	writer: {type: String, required: true},
	source: String,
	quoteBody: {type: String, required: true}
});

module.exports = mongoose.model('Quote', quoteSchema);