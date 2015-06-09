'use strict';

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-webpack');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.initConfig({
		webpack: {
			client: {
				entry: __dirname + '/app/js/client.jsx',
				output: {
					path: 'build/',
					file: 'bundle.js'
				},
				module: {
					loaders: [
						{
							test: /\.jsx$/,
							loader: 'jsx-loader'
						}
					]
				}
			},
			test: {
				entry: __dirname + '/test/client/test.js',
				output: {
					path: 'test/client/',
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
			mocha: {
				src: ['test/server/*test.js'],
				options: {
					globals: {
						describe: true,
						it: true,
						before: true,
						beforeEach: true,
						after: true,
						afterEach: true
					}
				}
			},
			server: {
				src: ['Gruntfile.js', 'server.js', 'models/*.js', 'routes/*.js']
			},
			client: {
				src: ['app/**/*.js'],
				options: {
					globals: {
						angular: true
					}
				}
			},
			options: {
				node: true
			}
		}
	});

	grunt.registerTask('build:dev', ['webpack:client', 'copy:html']);
	grunt.registerTask('build', ['build:dev']);
	grunt.registerTask('karmatest', ['webpack:karma', 'karma:test']);
	grunt.registerTask('jshint:all', ['jshint:jasmine', 'jshint:mocha', 'jshint:server', 'jshint:client']);
	grunt.registerTask('default', ['build', 'jshint:all']);

};
