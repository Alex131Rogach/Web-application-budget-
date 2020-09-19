const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const concat = require("gulp-concat");

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "src"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// gulp.task('unionCss', function() {
//     return gulp.src('./src/css/*.css')
//     .pipe(concat('main.css'))
//     .pipe(autoprefixer())
//     .pipe(cleanCSS({compatibility: 'ie8'}))
//     .pipe(gulp.dest('css/'));
// });
gulp.task('js', function() {
    return gulp.src("src/js/*.js")
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
    gulp.watch("src/js/*.js", gulp.parallel('js'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));
