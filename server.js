'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var app = express();

var port = process.env.PORT || 3000;

process.env.APP_SECRET = process.env.APP_SECRET || 'changethischangethischangethis!';

var notesRoutes = express.Router();
var usersRoutes = express.Router();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/notes_dev');


app.use(passport.initialize());

require('./lib/passport_strat')(passport);

require('./router/notes_routes')(notesRoutes);
require('./router/auth_routes')(usersRoutes, passport);

app.use('/api', notesRoutes);
app.use('/api', usersRoutes);

app.listen(port, function() {
	console.log('Your server is running on port ' + port);
});	