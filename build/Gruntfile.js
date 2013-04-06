/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*\n' +
        '<%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage %>\n' +
        'Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'JV Software\n' +
        '*/\n',
      wpblock: '/*\n' +
        'Theme Name: <%= pkg.name %>\n' +
        'Theme URI: <%= pkg.homepage %>\n' +
        'Description: <%= pkg.description %>\n' +
        'Author: JV Software\n' +
        'Author URI: <%= pkg.homepage %>\n' +
        'Version: <%= pkg.version %>\n' +
        '*/'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        devel: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      files: ['Gruntfile.js', '../js/script.js']
    },
    concat: {
      dev: {
        src: ['../js/libs/!(modernizr|selectivizr).js', '../js/script.js'],
        dest: '../js/script.min.js'
      },
      dist: {
        options: {
          stripBanners: true
        },
        src: '<%= concat.dev.src %>',
        dest: '../js/script.min.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: ['../js/script.min.js'],
        dest: '../js/script.min.js'
      }
    },
    compass: {
      options: {
        cssDir: '..',
        sassDir: '../sass',
        imagesDir: '../img',
        javascriptsDir: '../js',
        fontsDir: '../fonts',
        relativeAssets: true,
        force: true
      },
      dev: {
        options: {
          noLineComments: false,
          outputStyle: 'expanded'
        }
      },
      dist: {
        options: {
          noLineComments: true,
          outputStyle: 'compressed'
        }
      }
    },
    watch: {
      dist: {
        files: ['<%= jshint.files %>', '../sass/**/*.scss', '../js/**/*.js'],
        tasks: 'default'
      },
      compass : {
        files: ['../sass/**/*.scss'],
        tasks: ['compass:dist', 'cssmin']
      }
    },
    clean: {
      options: {
        force: true
      },
      dist: {
        src: ['<%= uglify.dist.dest %>', '<%= cssmin.dist.dest %>']
      }
    },
    imagemin: {
      options: {
        optimizationLevel: 7,
        progressive: true
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '../img',
            src: ['**/*.{png,jpg,jpeg}'],
            dest: '../img'
          }
        ]
      }
    },
    cssmin: {
      options: {
        banner: '<%= meta.wpblock %>',
        keepSpecialComments: false
      },
      dist: {
        src: ['../style.css'],
        dest: '../style.css'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat:dist', 'uglify', 'compass:dist', 'cssmin']);
  // Dev tasks disable asset minification
  grunt.registerTask('dev', ['jshint', 'concat:dev', 'compass:dev']);

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

};
