'use strict';

/**
 * GULPFILE SETUP
 * 
 */

    // Gulp
    var gulp        = require('gulp'),
        clean       = require('gulp-clean'),
        watch       = require('gulp-watch'),



    // javascript
        uglify      = require('gulp-uglify'),


    // Sass/CSS stuff
        sass        = require('gulp-sass'),
        prefix      = require('gulp-autoprefixer'),
        minifycss   = require('gulp-clean-css'),


    // Images
        svgmin      = require('gulp-svgmin'),
        imagemin    = require('gulp-imagemin');


    // compile Sass
        gulp.task('sass', function (){
            return gulp.src('./dev/sass/*.sass')
                .pipe(sass().on('error', sass.logError))
                .pipe(prefix("last 2 versions", "> 1%", "ie 8", "ie 7"))
                .pipe(gulp.dest('./css'));
        });

    // Uglify JS
        gulp.task('uglify', function(){
            gulp.src('./dev/js/*.js')
                .pipe(uglify())
                .pipe(gulp.dest('./js'));
        });

    // Compress SVG
        gulp.task('svgmin', function() {
            gulp.src('./dev/images/svg/*.svg')
            .pipe(svgmin())
            .pipe(gulp.dest('./images/svg'))
        });

    // Compress Images
        gulp.task('imagemin', function () {
            gulp.src('./dev/images/**/*')
            .pipe(imagemin())
            .pipe(gulp.dest('./images'))
        });




    // DEVELOPMENT TASKS
    gulp.task('default', ['sass','uglify','svgmin','imagemin'], function(){

        // watch me getting Sassy
        gulp.watch("./dev/sass/**/*.sass", function(event){
            gulp.run('sass');
        });
        // make my JavaScript ugly
        gulp.watch("./dev/js/**/*.js", function(event){
            gulp.run('uglify');
        });
        // images
        gulp.watch("./dev/images/**/*", function(event){
            gulp.run('imagemin');
            gulp.run('svgmin');
        });
        
    });

