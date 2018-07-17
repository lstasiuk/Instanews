// Modules you need!
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    eslint = require('gulp-eslint');


// Task below - what do you want gulp to do?
// gulp.task('default', defaultTask)
// default = gulp

gulp.task('lint', function() {
    return (gulp
        .src('./js/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
    );
});

gulp.task("scripts", gulp.series("lint", function() {
    return gulp
        .src("./js/*.js") // these are the files gulp will consume
        .pipe(uglify()) //call uglify function on these files
        .pipe(rename({ extname: ".min.js" })) //rename ugly file
        .pipe(gulp.dest("./build/js"));
}));

gulp.task("watch", function() {
    gulp.watch("js/*.js", gulp.series("scripts"));
});

// var gulp = require('gulp');
// var browserSync = require('browser-sync').create();
// Make a browsersync task
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp
    .watch(['build/js/*.js', '*.html'])
    .on('change', browserSync.reload);

gulp.task("watch", function() {
    gulp.watch("js/*.js", gulp.series("scripts"));
});

gulp.task("default", gulp.parallel("browser-sync", "watch"));