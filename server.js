'use strict';

var mongoose = require('mongoose');
var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var routes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/development');

app.listen(port, function() {
	console.log('Your server is running on port ' + port);
});
