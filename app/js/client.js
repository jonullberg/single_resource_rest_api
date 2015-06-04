'use strict';

require('angular/angular');

var notesApp = angular.module('notesApp', []);

// 	Services
require('./services/rest_resource')(notesApp);
require('./services/copy')(notesApp);

//	Controllers
require('./notes/controllers/notes_controller')(notesApp);

//	Directives
require('./notes/directives/note_form_directive')(notesApp);