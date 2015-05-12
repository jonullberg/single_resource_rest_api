'use strict';

var Sql = require('sequelize');
var sql = new Sql('notes_dev', 'notes_dev', 'foobar123', {
	dialect: 'postgres'
});

var Quote = module.exports = sql.define('Quote', {
	writer: Sql.STRING,
	source: Sql.STRING,
	quoteBody: Sql.STRING
});

Quote.sync();