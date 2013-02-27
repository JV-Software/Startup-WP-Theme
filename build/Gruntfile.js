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
      files: ['grunt.js', '../js/script.js']
    },
    concat: {
      options: {
        stripBanners: true
      },
      dist: {
        src: ['../js/libs/!(modernizr|selectivizr).js', '../js/script.js'],
        dest: '../js/script.min.js'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat']);

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');

};
