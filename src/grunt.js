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
        'JV Software; Licensed MIT */'
    },
    lint: {
       files: ['grunt.js', '../js/script.js']
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '../js/libs/*.js', '../js/script.js'],
        dest: '../js/script.min.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: '<config:concat.dist.dest>'
      }
    },
    watch: {
      files: ['<config:lint.files>', '../sass/*.scss'],
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
        devel: true
      },
      globals: {}
    },
    uglify: {},
    compass: {
      dist: {}
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint concat min compass');
  
  // Compass tasks
  grunt.loadNpmTasks('grunt-compass');

};