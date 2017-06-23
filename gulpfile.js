var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate')
var uglify = require('gulp-uglify');
var del = require('del');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps')
var ejs = require('gulp-ejs');
var browserSync = require('browser-sync');

// File Paths
var DIST_PATH = './build';
var SCRIPTS_PATH = './src/js/**/*.js';
var CSS_PATH = './src/css/**/*.css';

// Styles for SCSS
gulp.task('css', function() {
    return gulp.src('src/scss/main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./build/css/'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    gulp.src(['src/**/app.js', SCRIPTS_PATH])
        .pipe(sourcemaps.init())
        .pipe(concat('js/app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_PATH))
})

gulp.task('ejs', function() {
    return gulp.src('./src/views/pages/index.ejs')
        .pipe(ejs({}, { ext: '.html' }))
        .pipe(gulp.dest('./build'))
});

gulp.task('watch', ['js', 'ejs'], browserSync.reload);

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['ejs', 'js', 'css'], function() {

});

// Watch scss AND html files, doing different things with each.
gulp.task('start', function() {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

    gulp.watch("src/views/**/*.ejs", ['watch'])
    gulp.watch("src/scss/**/*.scss", ['css'])
    gulp.watch("src/js/**/*.js", ['watch'])
});

gulp.task('build', ['ejs', 'js', 'css']);