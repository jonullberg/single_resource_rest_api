'use strict';

module.exports = function(app) {
	app.factory('auth', ['$http', '$base64', '$cookies', function($http, $base64, $cookies) {
		return {
			signIn: function(user, callback) {
				var encoded = $base64.encode(user.email + ':' + user.password);
				$http.get('/api/sign_in', {
					headers: {'Authorization': 'Basic ' + encoded}
				})
				.success(function(data) {
					$cookies.put('eat', data.eat);
					callback(null);
				})
				.error(function(data) {
					callback(data);
				});
			},

			create: function(user, callback) {
				$http.post('/api/create_user', user)
					.success(function(data) {
						$cookies.put('eat', data.eat);
						callback(null);
					})
					.error(function(data) {
						callback(data);
					});
			},

			logout: function() {
				return $cookies.put('eat', '');
			},

			isSignedIn: function() {
				return !!($cookies.get('eat') && $cookies.get('eat').length);
			}
		};
	}]);
};