/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* <%= pkg.homepage %>\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'JV Software */',
      wpblock: '/*! \n' + 
        'Theme Name: <%= pkg.name %> \n' +
        'Theme URI: <%= pkg.homepage %> \n' +
        'Description: <%= pkg.description %> \n' +
        'Author: JV Software \n' +
        'Author URI: <%= pkg.homepage %> \n' +
        'Version: <%= pkg.version %> \n' + 
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
      files: ['<config:lint.files>', '../sass/**/*.scss', '../js/**/*.js'],
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
