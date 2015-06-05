'use strict';

module.exports = function(app) {
	app.controller('authController', ['$scope', '$location', 'auth', function($scope, $location, auth) {
		
		if(auth.isSignedIn()) $location.path('/notes');
		$scope.errors = [];
		$scope.authSubmit = function(user) {
			if(user.password_confirmation && user.password === user.password_confirmation) {
				auth.create(user, function(err) {
					if(err) {
						console.log(err);
						return $scope.errors.push({ msg: 'Could not create a user' });
					}

					$location.path('/notes');
				});
			} else {
				auth.signIn(user, function(err) {
					if(err) {
						console.log(err);
						return $scope.errors.push({ msg: 'Could not sign in' });
					}

					$location.path('/notes');
				});
			}
		};

	}]);
};