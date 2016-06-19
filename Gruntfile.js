module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ' '
      },
      dist: {
        src: [
        'sources/app.js',
        'sources/index.route.js',
        'sources/app/**/*.js'
	    ],
        dest: 'dist/temp/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
	mangle: false
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    
    clean: {
       temp: ['dist/temp']
    },
    copy : {
      images: {
         expand: true,
         cwd: 'sources/images/',
         src: '**',
         dest: 'dist/images/'
      },
      html: {
         expand: true,
         cwd: 'sources/app',
         src: ['**/*.html'],
         dest: 'dist/'
      },
      index: {
         expand: true,
         cwd: 'sources',
         src: ['index.html'],
         dest: 'dist/'
      },
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ["sources/**"]
	  ,
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
	cssmin: {
	  options: {
		shorthandCompacting: false,
		roundingPrecision: -1
	  },
	  target: {
		files: {
		  'dist/css/<%= pkg.name %>.css': [
			'sources/**/*.css'
		  ]
		}
	  }
	},
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['concat', 'uglify', 'copy', 'cssmin']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['concat', 'uglify', 'copy', 'cssmin', 'watch']);

};
