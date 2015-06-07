'use strict';

require('../../../app/js/client');
require('angular-mocks');

describe('The Auth controller', function() {
	var $ControllerConstructor;
	var $httpBackend;
	var $scope;

	beforeEach(angular.mock.module('notesApp'));

	beforeEach(angular.mock.inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		$ControllerConstructor = $controller;
	}));

	it('Should be able to create a new controller', function() {
		var authController = $ControllerConstructor('authController', {$scope: $scope});
		expect(typeof authController).toBe('object');
		expect(Array.isArray($scope.errors)).toBe(true);
		expect(typeof $scope.authSubmit).toBe('function');
	});

	describe('REST functionality', function() {
	
		var testUser = {email: 'test@example.com', password: 'foobar123', password_confirmation: 'foobar123'};
		var badNewUser = {email: 'badtest@example.com', password: 'foobar123', password_confirmation: 'foobar124'};
		beforeEach(angular.mock.inject(function(_$httpBackend_) {
			$httpBackend = _$httpBackend_;
			this.authController = $ControllerConstructor('authController', { $scope: $scope });
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('Should make a POST request for new user', function() {
			$httpBackend.expectPOST('/api/create_user').respond(200, testUser);
			$scope.authSubmit(testUser);
			$httpBackend.flush();
			expect($scope.errors.length).toBe(0);

		});

		it('Should handle errors', function() {
			$httpBackend.expectPOST('/api/create_user').respond(200, badNewUser);
			$scope.authSubmit(badNewUser);
			expect($scope.errors.length).toBe(1);
		});
	});
});