'use strict';

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.initConfig({
		jshint: {
			gruntfile: {
				src: ['Gruntfile.js']
			},
			all: {
				src: ['Gruntfile.js', 'router/**/*.js', 'test/**/*.js', 'server.js', 'model/**/*.js']
			},
			options: {
				jshintrc: '.jshintrc'
			}
		}
	});

	grunt.registerTask('hint', ['jshint:all']);
	grunt.registerTask('test', ['hint']);
	grunt.registerTask('default', ['jshint:all']);

};
