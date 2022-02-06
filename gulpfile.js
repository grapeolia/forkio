import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import concat from 'gulp-concat';
import del from 'del';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import imageMin from 'gulp-imagemin';
import { create as bsCreate } from 'browser-sync';
import autoPrefixer from 'gulp-autoprefixer';
const browserSync = bsCreate();
const sass = gulpSass(dartSass);

gulp.task('css_build', function() {
    return gulp
        .src('./src/scss/style.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(autoPrefixer('last 2 version'))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('compress_img', function() {
    return gulp
        .src('src/img/**')
        .pipe(
            imageMin({
                progressive: true,
            })
        )
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('js_build', function() {
    return gulp
        .src('src/js/**/*.js')
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('clean_dist', function() {
    return del('dist/**', { force: true });
});

gulp.task(
    'build',
    gulp.series('clean_dist', gulp.parallel(['css_build', 'js_build', 'compress_img']))
);


gulp.task('dev', function() {
    browserSync.init({
        server: './',
    });
    gulp.watch('src/**/*.scss', gulp.series('css_build'));
    gulp.watch('src/**/*.js', gulp.series('js_build'));
    gulp.watch('src/img/**', gulp.series('compress_img'));
});

gulp.task('default', gulp.series(['build', 'dev']));