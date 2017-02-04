module.exports = function(grunt) {
	grunt.initConfig({
		uglify: {
			options: {
				mangle: false
			},
			dist: {
				files: {
					'gamebutton.min.js': ['src/gamebutton.js']
				}
			}
		},
		less: {
			dist: {
				options: {
					paths: ["src/"],
					compress: true,
					cleancss: true,
				},
				files: {
					"gamebutton.min.css": "src/*.less"
				}
			}
		},
		autoprefixer: {
			dist: {
				src: 'gamebutton.min.css',
				dest: 'gamebutton.min.css'
			}
		},
		compress: {
		  main: {
			options: {
			  archive: 'gamebutton.latest.zip'
			},
			files: [
			  {src: ['*.min.css'], dest: 'gamebutton/', filter: 'isFile'}, // includes files in path
			  {src: ['*.min.js'], dest: 'gamebutton/', filter: 'isFile'}, // includes files in path
			]
		  }
		},
		watch: {
			dist: {
				files: ['src/*'],
				tasks: ['uglify', 'less', 'autoprefixer'],
				options: {
					spawn: false
				}
			}
		}

	});
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compress');

	grunt.registerTask('default', ['uglify', 'less:dist', 'autoprefixer']);
}