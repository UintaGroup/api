var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2017-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

// Compiles SCSS files from /scss into /css
gulp.task('sass', function() {
  return gulp.src('./src/client/scss/style.scss')
    .pipe(sass())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('./bin/public/css'));
});

// Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
  return gulp.src('./bin/public/css/style.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./bin/public/css'));
});

// Minify custom JS
gulp.task('minify-js', function() {
  return gulp.src('./src/client/js/site.js')
    .pipe(uglify())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./bin/public/js'));
});

// Copy vendor files from /node_modules into /vendor
// NOTE: requires `npm install` before running!
gulp.task('copy', function() {
  gulp.src([
      'node_modules/bootstrap/dist/**/*',
      '!**/npm.js',
      '!**/bootstrap-theme.*',
      '!**/*.map'
    ])
    .pipe(gulp.dest('./bin/public/vendor/bootstrap'));

  gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('./bin/public/vendor/jquery'));

  gulp.src(['node_modules/jquery.easing/*.js'])
    .pipe(gulp.dest('./bin/public/vendor/jquery-easing'));

  gulp.src('./src/client/index.html')
    .pipe(gulp.dest('./bin/public'));

  gulp.src('./src/client/img/*')
    .pipe(gulp.dest('./bin/public/img/'));

  gulp.src([
      'node_modules/font-awesome/**',
      '!node_modules/font-awesome/**/*.map',
      '!node_modules/font-awesome/.npmignore',
      '!node_modules/font-awesome/*.txt',
      '!node_modules/font-awesome/*.md',
      '!node_modules/font-awesome/*.json'
    ])
    .pipe(gulp.dest('./bin/public/vendor/font-awesome'))
});

// Default task
gulp.task('default', ['sass', 'minify-css', 'minify-js', 'copy']);

gulp.task('dev', ['sass', 'minify-css', 'minify-js'], function() {
  gulp.watch('./src/client/scss/*.scss', ['sass']);
  gulp.watch('./src/client/css/*.css', ['minify-css']);
  gulp.watch('./src/client/js/*.js', ['minify-js']);
});
