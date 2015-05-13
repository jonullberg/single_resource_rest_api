'use strict';

var Sql = require('sequelize');
var sql = new Sql(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASS, {
	dialect: 'postgres'
});

var Quote = module.exports = sql.define('Quote', {
	writer: Sql.STRING,
	source: Sql.STRING,
	quoteBody: Sql.STRING
});

Quote.sync();