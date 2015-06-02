'use strict';

var mongoose = require('mongoose');
var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var noteRoutes = express.Router();

app.use(express.static(__dirname + '/build'));

require('./router/notes_routes')(noteRoutes);

app.use('/api', noteRoutes);

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/development');

app.listen(port, function() {
	console.log('Your server is running on port ' + port);
});
