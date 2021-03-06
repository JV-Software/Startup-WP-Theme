/* jshint indent: 2 */
/* global module, require */
module.exports = function(grunt) {

  // show elapsed time at the end
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*\n' +
        '<%= _(_.humanize(pkg.name)).titleize() %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage %>\n' +
        'Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        '<%= pkg.author %>\n' +
        '*/',
      wpblock: '/*\n' +
        'Theme Name: <%= _(_.humanize(pkg.name)).titleize() %>\n' +
        'Theme URI: <%= pkg.homepage %>\n' +
        'Description: <%= pkg.description %>\n' +
        'Author: <%= pkg.author %>\n' +
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
    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        sourceMap: true
      },
      dist: {
        src: ['../js/libs/!(modernizr|selectivizr).js', '../js/script.js'],
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
        importPath: '../sass/partials',
        force: true,
        require: ['compass-inuit', 'compass-photoshop-drop-shadow', 'compass-photoshop-gradient-overlay']
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
      options: {
        livereload: true
      },
      js: {
        files: ['Gruntfile.js', '../js/**/*.js', '!<%= uglify.dist.dest %>'],
        tasks: ['jshint', 'uglify']
      },
      compass : {
        files: ['../sass/**/*.scss'],
        tasks: ['compass:dist', 'autoprefixer', 'cssmin']
      },
      php : {
        files: ['../**/*.php']
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
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8']
      },
      dist: {
        src: '<%= cssmin.dist.dest %>',
        dest: '<%= cssmin.dist.dest %>'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'uglify', 'compass:dist', 'autoprefixer', 'cssmin']);
  // Dev tasks disable asset minification
  grunt.registerTask('dev', ['jshint', 'compass:dev', 'autoprefixer']);

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-autoprefixer');

};
