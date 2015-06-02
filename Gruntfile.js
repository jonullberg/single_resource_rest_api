'use strict';

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-webpack');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.initConfig({
		webpack: {
			client: {
				entry: __dirname + '/app/js/client.js',
				output: {
					path: 'build/',
					file: 'bundle.js'
				}
			},
			test: {
				entry: __dirname + '/test/client/test.js',
				output: {
					path: 'test/client/',
					file: 'bundle.js'
				}
			},
			karma: {
				entry: __dirname + '/test/karma_tests/test_entry.js',
				output: {
					path: 'test/karma_tests/',
					file: 'bundle.js'
				}
			}
		},
		copy: {
			html: {
				cwd: 'app/',
				expand: true,
				flatten: false,
				src: '**/*.html',
				dest: 'build/',
				filter: 'isFile'
			}
		},
		clean: {
			dev: {
				src: 'build/'
			}
		},
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

	grunt.registerTask('build:test', ['webpack:test', 'copy:html']);
	grunt.registerTask('build:karma', ['webpack:karma']);
	grunt.registerTask('build:dev', ['webpack:client', 'copy:html']);
	grunt.registerTask('build', ['build:dev']);
	grunt.registerTask('hint', ['jshint:all']);
	grunt.registerTask('test', ['hint']);
	grunt.registerTask('default', ['jshint:all', 'build']);

};
