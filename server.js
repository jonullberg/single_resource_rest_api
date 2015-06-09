'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/build'));

var notesRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/development');

require('./router/notes_routes')(notesRoutes);

app.use('/api', notesRoutes);


app.listen(port, function() {
	console.log('Your server is running on port ' + port);
});
