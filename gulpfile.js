'use strict';

var autoprefixer = require('gulp-autoprefixer');
var browserify   = require('browserify');
var browserSync  = require('browser-sync').create();
var buffer       = require('vinyl-buffer');
var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var sass         = require('gulp-sass');
var source       = require('vinyl-source-stream');
var uglify       = require('gulp-uglify');
var watch        = require('gulp-watch');
var watchify     = require('watchify');
var reactify = require('reactify');

/**
 * Sass
 */
gulp.task('sass', function () {
  return gulp.src('./assets/_sass/**/*')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
    }))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
});

/**
 * Browserify and Watchify and Reactify
 */
var b = browserify({
  entries: ['./assets/_js/main.js'],
  transform: [reactify],
});

function bundle() {
  return b.transform('browserify-shim', { global: true })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js'))
    .pipe(browserSync.stream());
}

gulp.task('browserify', bundle);

gulp.task('watchify', function () {
  b = watchify(b);
  b.on('update', bundle);
});

/**
 * Browsersync
 */
gulp.task('browsersync', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

/**
 * Watch
 */
gulp.task('watch', ['watchify'], function () {
  gulp.watch('./assets/_sass/**/*', ['sass']);
  gulp.watch([
    './**/*.html'
  ]).on('change', browserSync.reload);
});

/**
 * Build
 */
gulp.task('build', ['sass', 'browserify']);

/**
 * Default
 */
gulp.task('default', ['sass', 'browserify', 'browsersync', 'watch']);
