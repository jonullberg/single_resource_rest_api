'use strict';

module.exports = function(app) {
	app.factory('copy', function() {
		return function(objToCopy) {
			var obj = {};
			Object.keys(objToCopy).forEach(function(key) {
				obj[key] = objToCopy[key];
			});
<<<<<<< HEAD
			return obj;
=======
>>>>>>> 00947d019b9b7ff67690d531d4dd73844a228c32
		};
	});
};