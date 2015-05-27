'use strict';

var User = require('../model/User');
var bodyparser = require('body-parser');

module.exports = function(router, passport) {
	router.use(bodyparser.json());

	router.post('/create_user', function(req, res) {
		var newUserData = JSON.parse(JSON.stringify(req.body));
		delete newUserData.email;
		delete newUserData.password;
		var newUser = new User(newUserData);
		newUser.basic.email = req.body.email;
		newUser.generateHash(req.body.password, function(err, hash) {
			if(err) {
				console.log(err);
				return res.status(500).json({ msg: 'Could not create user' });
			}
			newUser.basic.password = hash;
			newUser.save(function(err, user) {
				if(err) {
					console.log(err);
					return res.status(500).json({ msg: 'Could not create user' });
				}
				user.generateToken(process.env.APP_SECRET, function(err, token) {

					if(err) {
						console.log(err);
						return res.status(500).json({ msg: 'Error generating token' });
					}
					res.json({ token: token });
				});
			});

		});
	});

	router.get('/sign_in', passport.authenticate('basic', { session: false }), function(req, res) {
		req.user.generateToken(process.env.APP_SECRET, function(err, token) {
			if(err) {
				console.log(err);
				return res.status(500).json({ msg: 'Error generating token' });
			}
			res.json({ token: token });
		});
	});
};