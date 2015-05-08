'use strict';

var mongoose = require('mongoose');
var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var quoteRoutes = express.Router();

require('./router/quotes_routes')(quoteRoutes);

app.use('/api', quoteRoutes);

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/development');

app.listen(port, function() {
	console.log('Your server is running on port ' + port);
});
