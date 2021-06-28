const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

//compile sass into css
function style() {
    return gulp.src("./src/scss/**/*.scss")
        .pipe(sass()).on('error', sass.logError)
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }

    });
    gulp.watch("./src/scss/**/*.scss", style);
    gulp.watch("./**/**/*.js", style).on('change', browserSync.reload);
    gulp.watch("./**/*.html", style).on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;