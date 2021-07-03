const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const path = require('path');
const rename = require('gulp-rename');
const cheerio = require('gulp-cheerio');

//compile sass into css
function style() {
    return gulp.src("./src/scss/**/*.scss")
        .pipe(sass()).on('error', sass.logError)
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        // You cannot specify both server & proxy options.
        //server: false,
        server: { baseDir: './' },
        //proxy: "dgd.local",

    });
    gulp.watch("./src/scss/**/*.scss", style);
    gulp.watch("./**/**/*.js", style).on('change', browserSync.reload);
    gulp.watch("./**/*.html", style).on('change', browserSync.reload);
    gulp.watch("./**/*.php", style).on('change', browserSync.reload);
}

gulp.task('svgstore', () => {
    return gulp
        .src('./src/svg/*.svg')
        .pipe(cheerio({
            run: ($) => {
                $('[fill]').removeAttr('fill');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(rename({
            basename: 'sprite'
        }))
        .pipe(gulp.dest('./dist/img'));
});


exports.style = style;
exports.watch = watch;
