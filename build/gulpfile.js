/* global require */
var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    jshint     = require('gulp-jshint'),
    compass    = require('gulp-compass'),
    livereload = require('gulp-livereload'),
    header     = require('gulp-header'),
    minify     = require('gulp-minify-css'),
    autoprefix = require('gulp-autoprefixer'),
    imagemin   = require('gulp-imagemin'),
    _s         = require('underscore.string');

var pkg  = require('./package.json'),
    meta = {
    banner: '/*\n' +
        '<%= _s.titleize(_s.humanize(pkg.name)) %> - v<%= pkg.version %> - ' +
        '<%= (new Date).toDateString() %>\n' +
        '<%= pkg.homepage %>\n' +
        'Copyright (c) <%= (new Date).toDateString() %> ' +
        '<%= pkg.author %>\n' +
        '*/\n',
    wpblock: '/*\n' +
        'Theme Name: <%= _s.titleize(_s.humanize(pkg.name)) %>\n' +
        'Theme URI: <%= pkg.homepage %>\n' +
        'Description: <%= pkg.description %>\n' +
        'Author: <%= pkg.author %>\n' +
        'Author URI: <%= pkg.homepage %>\n' +
        'Version: <%= pkg.version %>\n' +
        '*/\n'
};

gulp.task('scripts', ['jshint'], function () {
    return gulp.src(['../js/libs/!(modernizr|selectivizr).js', '../js/script.js'])
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(header(meta.banner, { pkg: pkg, _s : _s }))
        .pipe(gulp.dest('../js'));
});

gulp.task('jshint', function () {
    return gulp.src('../js/script.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('sass', function () {
    return gulp.src('../sass/**/*.scss')
        .pipe(compass({
            css: '..',
            sass: '../sass',
            image: '../img',
            javascript: '../js',
            font: '../fonts',
            style: 'compressed',
            comments: false,
            import_path: '../sass/partials',
            require: ['compass-inuit', 'compass-photoshop-drop-shadow', 'compass-photoshop-gradient-overlay']
        }))
        .pipe(autoprefix('last 2 versions', 'ie 8', 'ie 9'))
        .pipe(minify({ keepSpecialComments: false }))
        .pipe(header(meta.wpblock, { pkg: pkg, _s : _s }))
        .pipe(gulp.dest('..'));
});

gulp.task('imagemin', function () {
    return gulp.src('../img/*')
        .pipe(imagemin({ progressive: true }))
        .pipe(gulp.dest('../img'));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['../js/**/*.js', '!(script.min.js)'], ['scripts']).on('change', livereload.changed);
    gulp.watch(['../sass/**/*.scss'], ['sass']).on('change', livereload.changed);
});