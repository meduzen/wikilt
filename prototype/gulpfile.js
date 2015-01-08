/*jslint browser: true, devel: true */
"use strict";

/*
 * Load modules / packages
 */

var gulp = require('gulp'),
    Notifier = require('node-notifier'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver');

var NotificationCenter = require('node-notifier').NotificationCenter;


/*
 * DEV main task (default)
 */

gulp.task('default', ['webserver', 'styles', 'watch'], function () {
    var notification = new NotificationCenter();
    notification.notify({
        title: 'Gulp notification',
        message: 'DEFAULT task COMPLETE!'
    });
});

// DEV: enable livereload
// Listen to static files, main script and styles files
gulp.task('webserver', function () {
    gulp
        .src([
            'css/'
        ])
        .pipe(webserver({
            livereload: {
                enable: true
            }
        }));
});

// ALL: Sass compilation + autoprefixer
gulp.task('styles', function () {
    return sass('scss/main.scss', {sourcemap: true, style: 'compact'})
        .pipe(autoprefixer(
            'last 2 versions',
            '> 5%',
            'ie >= 9',
            'Firefox ESR'
        ))
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: '../scss'
        }))
        .pipe(gulp.dest('css/'))
        .pipe(notify({
            onLast: true,
            message: 'STYLES task SUCCESS!',
            icon: null
        }));
});

// DEV: watch for styles changes
gulp.task('watch', function () {
    gulp.watch('scss/**/*.scss', ['styles']);
});
