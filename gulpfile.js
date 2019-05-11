'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let cssnano = require('gulp-cssnano');
let sourcemaps = require('gulp-sourcemaps');
let autoprefixer = require('gulp-autoprefixer');
let jshint = require('gulp-jshint');
let concat = require('gulp-concat');
//let terser = require(terser);
let rename = require('gulp-rename');
let browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './dist',
            index: "index.html"
       },
    })
})

gulp.task('copyHtml', function(){
    gulp.src('src/*.html').pipe(gulp.dest('dist'));
});

// gulp.task('workflow', function () {
//   gulp.src('./src/sass/**/*.scss')
//     .pipe( sourcemaps.init() )
//     .pipe( sass().on('error', sass.logError) )
//     .pipe( autoprefixer({
//       browsers: ['last 99 versions'],
//       cascade: false
//     }) )
//     .pipe(cssnano())
//     .pipe(sourcemaps.write('./'))
//     .pipe(gulp.dest('./dist/css/'))
//     .pipe(browserSync.reload({
//       stream: true
//     }));

// });

gulp.task('css', function(){
  gulp.src('src/css/*.css')
    .pipe(gulp.dest('dist/css'));
});

gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
        .pipe(jshint({
            esnext: true
          }
        ))
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
          stream: true
         }));

});




gulp.task('default', ['css','lint','scripts', 'browserSync','copyHtml'], function () {
  gulp.watch('./src/sass/**/*.scss', ['workflow']);
  gulp.watch('./src/js/*.js', ['lint', 'scripts']);
});

