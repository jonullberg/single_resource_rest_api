'use strict';

require('../../../app/js/client');
require('angular-mocks');

describe('The Auth controller', function() {
	var $ControllerConstructor;
	var $httpBackend;
	var $scope;
	var $location;

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
	
		var testNewUser = {email: 'test@example.com', password: 'foobar123', password_confirmation: 'foobar123'};
		var badNewUser = {email: 'badtest@example.com', password: 'foobar123', password_confirmation: 'foobar124'};
		var testReturningUser = {email: 'test@example.com', password: 'foobar123' }
		beforeEach(angular.mock.inject(function(_$httpBackend_, _$location_) {
			$httpBackend = _$httpBackend_;
			$location = _$location_;
			this.authController = $ControllerConstructor('authController', { $scope: $scope });
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('Should make a POST request for new user', function() {
			$httpBackend.expectPOST('/api/create_user').respond(200, testNewUser);
			$scope.authSubmit(testNewUser);
			$httpBackend.flush();
			expect($location.path()).toBe('/notes');
			expect($scope.errors.length).toBe(0);
			// expect($location.path());

		});

		it('Should handle errors on bad confirmed password', function() {
			$scope.authSubmit(badNewUser);
			expect($scope.errors.length).toBe(1);
			expect($scope.errors[0].msg).toBe('Your password and confirmation did not match');
		});

		it('Should make a get request for a returning user', function() {
			$httpBackend.expectGET('/api/sign_in').respond(200, testReturningUser);
			$scope.authSubmit(testReturningUser);
			$httpBackend.flush();
			expect($scope.errors.length).toBe(0);
			expect($location.path()).toBe('/notes');
		});
	});
});