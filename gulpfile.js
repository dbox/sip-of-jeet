var gulp = require('gulp'),
    gutil = require('gulp-util'),
    stylus = require('gulp-stylus'),
    jeet = require('jeet'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    plumber = require('gulp-plumber');

var onError = function (err) {
  gutil.beep();
  console.log(err);
};

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./demo"
    }
  });
});

gulp.task('stylus', function() {
  return gulp.src('demo/css/style.styl')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(stylus({
      use: [jeet()]
    }))
    .pipe(gulp.dest('demo/css/'))
    .pipe(reload({ stream: true }));
});

gulp.task('autoprefixer', ['stylus'], function () {
  return gulp.src('demo/css/style.css')
    .pipe(prefix())
    .pipe(gulp.dest('demo/css/'));
});

gulp.watch('demo/css/**/*.styl', ['autoprefixer']);

gulp.task('default', ['autoprefixer', 'browser-sync']);
