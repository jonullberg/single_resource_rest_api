'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('Notes controller', function() {
	var $CC;
	var $httpBackend;
	var $scope;

	beforeEach(angular.mock.module('notesApp'));

	beforeEach(angular.mock.inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		$CC = $controller;
	}));

	it('Should be able to create a new controller', function() {
		var notesController = $CC('notesController', {$scope: $scope});
		expect(typeof notesController).toBe('object');
		expect(Array.isArray($scope.notes)).toBe(true);
		expect(Array.isArray($scope.errors)).toBe(true);
		expect(typeof $scope.getAll).toBe('function');
	});

	describe('REST functionality', function() {
		beforeEach(angular.mock.inject(function(_$httpBackend_) {
			$httpBackend = _$httpBackend_;
			this.notesController = $CC('notesController', {$scope: $scope});
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('Should make a get request', function() {
			$httpBackend.expectGET('/api/notes').respond(200, [{_id: '1', noteBody: 'test note'}]);
			$scope.getAll();
			$httpBackend.flush();
			expect($scope.notes[0].noteBody).toBe('test note');
			expect($scope.notes[0]._id).toBe('1');
		});

		it('Should correctly handle errors', function() {
			$httpBackend.expectGET('/api/notes').respond(500, {msg: 'server error'});
			$scope.getAll();
			$httpBackend.flush();
			expect($scope.errors.length).toBe(1);
			expect($scope.errors[0].msg).toBe('Error retrieving notes');
		});

		it('Should be able to save a new note', function() {
			$scope.newNote = {_id: '2', noteBody: 'A second test note'};
			$httpBackend.expectPOST('/api/notes').respond(200, $scope.newNote);
			$scope.createNewNote();
			$httpBackend.flush();
			expect($scope.notes[0].noteBody).toBe('A second test note');
			expect($scope.notes[0]._id).toBe('2');
			expect($scope.newNote).toBe(null);
		});
	});
});