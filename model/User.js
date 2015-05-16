'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var userSchema = mongoose.Schema({
	username: String,
	basic: {
		email: { type: String, unique: true },
		password: String
	}
});

userSchema.methods.generateHash = function(password, callback) {
	bcrypt.genSalt(8, function(err, salt) {
		bcrypt.hash(password, salt, null, function(err, hash) {
			return callback(err, hash);
		});
	});
};

userSchema.methods.checkPassword = function(password, callback) {
	bcrypt.compare(password, this.basic.password, function(err, res) {
		return callback(err, res);
	});
};

userSchema.methods.generateToken = function(secret, callback) {
	eat.encode({ id: this._id }, secret, callback);
};

userSchema.method.owns = function(obj) {
	return obj.authorId === this._id;
};

module.exports = mongoose.model('User', userSchema);