/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.1.0',
      banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://www.jvsoftware.com/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'JV Software; Licensed MIT */',
      wpblock: '/*! \n' + 
        'Theme Name: Startup Theme \n' +
        'Theme URI: http://www.jvsoftware.com \n' +
        'Description: Custom theme developed for Startup Theme \n' +
        'Author: JV Software \n' +
        'Author URI: http://www.jvsoftware.com \n' +
        'Version: 1.0 \n' + 
        '*/'
    },
    lint: {
       files: ['grunt.js', '../js/script.js']
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '../js/libs/!(modernizr|selectivizr).js', '../js/script.js'],
        dest: '../js/script.min.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: '<config:concat.dist.dest>'
      }
    },
    cssmin: {
      dist: {
        src: ['<banner:meta.wpblock>', '../style.css'],
        dest: '../style.css'
      }
    },
    watch: {
      files: ['<config:lint.files>', '../sass/**/*.scss', '../js/**/.js'],
      tasks: 'default'
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
        jquery: true,
        devel: true,
        browser: true
      },
      globals: {}
    },
    uglify: {},
    compass: {
      dist: {
        forcecompile: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint concat min compass cssmin');
  
  // Compass tasks
  grunt.loadNpmTasks('grunt-compass');
  // CSS tasks
  grunt.loadNpmTasks('grunt-css');

};