'use strict';

var expect = require('chai').expect;
var intro = require('../../app/js/introduction');

describe('The introduction to the website', function() {
	it('Should return the intro', function() {
		expect(intro()).to.equal('Welcome to my note-Writing app.  This app should allow you to create notes that are saved to a database and recall them for later reading.');
	});
});