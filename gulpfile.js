// Modules you need!
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    eslint = require('gulp-eslint'),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    cssnano = require("gulp-cssnano"),
    prettyError = require("gulp-prettyError"),
    babel = require("gulp-babel");

gulp.task("sass", function() {
    return gulp
        .src("./sass/style.scss")
        .pipe(prettyError())
        .pipe(sass())
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"]
            })
        )
        .pipe(gulp.dest("./build/css"))
        .pipe(cssnano())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("./build/css"));
});

gulp.task('lint', function() {
    return (gulp
        .src('./js/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
    );
});
gulp.task(
    'scripts',
    gulp.series('lint', function() {
        return gulp
            .src('./js/*.js')
            .pipe(babel())
            .pipe(uglify())
            .pipe(
                rename({
                    extname: '.min.js'
                })
            )
            .pipe(gulp.dest('./build/js'));
    })
);

gulp.task("watch", function() {
    gulp.watch("js/*.js", gulp.series("scripts"));
    gulp.watch("sass/**/*.scss", gulp.series("sass"));
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
    .watch(['build/**/*', '*.html'])
    .on('change', browserSync.reload);

gulp.task("watch", function() {
    gulp.watch("js/*.js", gulp.series("scripts"));
    gulp.watch("sass/**/*.scss", gulp.series("sass"));
});

gulp.task("default", gulp.parallel("browser-sync", "watch"));