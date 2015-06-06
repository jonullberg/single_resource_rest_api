'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('The Auth controller', function() {
	var $CC;
	var $httpBackend;
	var $scope;

	beforeEach(angular.mock.module('notesApp'));

	beforeEach(angular.mock.inject(function($rootScope, $controller) {
		$scope = $rootScope.new();
		$CC = $controller;
	}));

	it('SHould be able to create a new controller', function() {
		var authController = $CC('authController', {$scope: $scope});
		expect(typeof authController).toBe('object');
		expect
	})
});