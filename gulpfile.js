const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

//compile sass into css
function style() {
    return gulp.src("./scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }

    });
    gulp.watch("./scss/**/*.scss", style);
    gulp.watch("./**/*.js", style).on('change', browserSync.reload);
    gulp.watch("./**/*.html", style).on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;