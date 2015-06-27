'use strict';

module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-webpack');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	var srcFiles = ['Gruntfile.js', './test/**/*test.js', './routes/*.js', './models/*.js', './lib/*.js', './app/**/*.js'];
	var bldFiles = ['Gruntfile.js', './test/**/*test.js', './routes/*.js', './models/*.js', './lib/*.js', './app/**/*.js', './app/**/*.html'];

	grunt.initConfig({

		webpack: {
			client: {
				entry: __dirname + '/app/js/client.js',
				output: {
					path:'build/',
					file:'bundle.js'
				}
				// watch: true,
				// keepalive: true
			},

			test: {
				entry: __dirname + '/test/client/test.js',
				output: {
					path: 'test/client',
					file: 'test_bundle.js'
				}
			},
		},

		copy:{
			html:{
				cwd: 'app/',
				expand: true,
				flatten: false,
				src:'**/*.html',
				dest:'build/',
				filter:'isFile'
			}
		},

		clean:{
			dev:{
				src:'build/'
			}
		},

		jshint: {
			dev: {
				src: srcFiles
			},

			options: {
				jshintrc: true
			}
		},

		simplemocha: {
			dev: {
				src: ['./test/**/*test.js']
			}
		},

		nodemon: {
			dev: {
				src: srcFiles
			}
		},

		watch: {
			files: bldFiles,
			html: {
                files: ['./app/**/*.html'],
                options: {
                    livereload: true
                }
            },
			tasks: ['webpack:client', 'copy:html']
		}

	});

	grunt.registerTask('test', ['jshint:dev', 'simplemocha:dev']);
	grunt.registerTask('build:dev', ['webpack:client', 'copy:html']);
	grunt.registerTask('build:test', ['webpack:test', 'copy:html']);
	grunt.registerTask('default', ['test']);
};

