'use strict';

module.exports = function(app) {
	app.controller('notesController', ['$scope', 'RESTResource', 'copy', function($scope, resource, copy) {
		var Note = resource('notes');
		$scope.errors = [];
		$scope.notes = [];

		$scope.getAll = function() {
			Note.getAll(function(err, data) {
				if(err) return $scope.errors.push({ msg: 'There was an error retrieving your notes' });
				$scope.notes = data;
			});
		};

		$scope.createNewNote = function(note) {
			var newNote = copy(note);
			note.noteBody = '';
			$scope.notes.push(newNote);
			Note.create(newNote, function(err, data) {
				if(err) return $scope.errors.push({ msg: 'There was an error creating your note' });
				$scope.notes.splice($scope.notes.indexOf(newNote), 1, data);
			});
		};

		$scope.removeNote = function(note) {
			$scope.notes.splice($scope.notes.indexOf(note), 1);
			Note.remove(note, function(err) {
				if(err) return $scope.errors.push({ msg: 'There was an error deleting your note' });
			});
		};


		$scope.saveNote = function(note) {
			note.editing = false;
			Note.save(note, function(err, data) {
				if(err) return $scope.errors.push({ msg: 'There was an error while updating your note' });
			});
		};

		$scope.clearErrors = function() {
			$scope.errors = [];
			$scope.getAll();
		};
	}]);
};