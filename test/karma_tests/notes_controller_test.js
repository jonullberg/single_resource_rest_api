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
			$scope.newNote = {noteBody: 'A second test note'};
			$httpBackend.expectPOST('/api/notes').respond(200, {_id: '2', noteBody: 'A second test note'});
			$scope.createNewNote();
			$httpBackend.flush();
			expect($scope.notes[0].noteBody).toBe('A second test note');
			expect($scope.newNote).toBe(null);
		});

		it('Should be able to delete a note', function() {
			var note = {_id: '3', noteBody: 'A third test note'};
			$scope.notes.push(note);
			$httpBackend.expectDELETE('/api/notes/3').respond(200, {msg: 'success'});
			expect($scope.notes.indexOf(note)).not.toBe(-1);
			$scope.removeNote(note);
			expect($scope.notes.indexOf(note)).toBe(-1);
			$httpBackend.flush();
			expect($scope.errors.length).toBe(0);
		});

		it('Should be able to delete a note even on server errors', function() {
			var note = {_id: '4', noteBody: 'A fourth test note'};
			$scope.notes.push(note);
			$httpBackend.expectDELETE('/api/notes/4').respond(500, {msg: 'Internal Server Error'});
			expect($scope.notes.indexOf(note)).not.toBe(-1);
			$scope.removeNote(note);
			expect($scope.notes.indexOf(note)).toBe(-1);
			$httpBackend.flush();
			expect($scope.errors.length).toBe(1);
			expect($scope.errors[0].msg).toBe('Could not remove note A fourth test note')

		});

		it('Should be able to update a note', function() {
			var note = {_id: '5', noteBody: 'A fifth test note, edited'};
			$scope.notes.push(note);
			$httpBackend.expectPUT('/api/notes/5').respond(200, {msg: 'Success!'});
			$scope.saveNote(note);
			expect($scope.notes[0].noteBody).toBe('A fifth test note, edited');
			$httpBackend.flush();
			expect($scope.errors.length).toBe(0);
		});
	});
});