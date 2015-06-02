'use strict';

module.exports = function(app) {
	app.controller('notesController', ['$scope', '$http', function($scope, $http) {
		$scope.errors = [];
		$scope.notes = [];
		// $scope.note.noteBodyInitial = $scope.note.noteBody;

		$scope.getAll = function() {
			$http.get('/api/notes')
				.success(function(data) {
					$scope.notes = data;
				})
				.error(function(data) {
					console.log(data);
					$scope.errors.push({ msg: 'Error retrieving notes' });
				});
		};

		$scope.createNewNote = function() {
			// $scope.notes.push($scope.newNote);
			$http.post('/api/notes', $scope.newNote)
				.success(function(data) {
					$scope.notes.push(data);
					$scope.newNote = null;
				})
				.error(function(data) {
					console.log(data);
					$scope.errors.push({ msg: 'Failed to create a new note' });
				});
		};

		$scope.removeNote = function(note) {
			$scope.notes.splice($scope.notes.indexOf(note), 1);
			$http.delete('/api/notes/' + note._id)
				.error(function(data) {
					console.log(data);
					$scope.errors.push({ msg: 'Could not remove note ' + note.noteBody });
				});
		};


		$scope.saveNote = function(note) {
			note.editing = false;

			$http.put('/api/notes/' + note._id, note)
				.error(function(data) {
					console.log(data);
					$scope.errors.push({ msg: 'Could not update note' });
				});
		};

		$scope.clearErrors = function() {
			$scope.errors = [];
			$scope.getAll();
		};
	}]);
};