import gulp from 'gulp';
import sass from'gulp-dart-sass';
import htmlmin from 'gulp-htmlmin';
import del from 'del';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import terser from 'gulp-terser';
import browser from 'browser-sync';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';

// Styles
const styles = () => {
    return gulp.src('source/sass/style.scss', { sourcemaps: true })
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            autoprefixer(),
            csso()
        ]))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('build/css', {sourcemaps: '.'}))
        .pipe(browser.stream());
}

// Html
const html = () => {
    return gulp.src('source/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'))
}

// Scripts
const scripts = () => {
    return gulp.src('source/scripts/main.js')
        .pipe(terser())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('build/scripts'))
        .pipe(browser.stream());
}

// Images
const optimizeImages = () => {
    return gulp.src('source/img/**/*.{png,jpg}')
        .pipe(squoosh())
        .pipe(gulp.dest('build/img'))
}

const copyImages = () => {
    return gulp.src('source/img/**/*.{png,jpg}')
        .pipe(gulp.dest('build/img'))
}

// WebP

const createWebp = () => {
    return gulp.src(['source/img/**/*.{png,jpg}', '!source/img/favicons/*.{png,jpg}'])
        .pipe(squoosh({
            webp: {}
        }))
        .pipe(gulp.dest('build/img'))
}

// SVG
const svg = () => {
    return gulp.src('source/img/*.svg')
        .pipe(svgo())
        .pipe(gulp.dest('build/img'))
}

// Copy

export const copy = (done) => {
    gulp.src([
        'source/fonts/*.{woff,woff2}',
        'source/bootstrap/*.*',
    ], {
        base: 'source'
      })
    .pipe(gulp.dest('build'))
    done();
}

// Clean
export const clean = () => {
    return del('build');
}

// Server
const server = (done) => {
    browser.init({
        server: {
            baseDir: 'build'
        },
        cors: true,
        notify: false,
        ui: false,
    });
    done();
}

// Reload
const reload = (done) => {
    browser.reload();
    done();
}

// Watcher
const watcher = () => {
    gulp.watch('source/sass/**/*.scss', styles);
    gulp.watch('source/scripts/**/*.js', scripts);
    gulp.watch('source/img/**/*.*', gulp.series(copyImages, svg));
    gulp.watch('source/*.html', gulp.series(html, reload));
}

// Build
export const build = gulp.series(
    clean,
    copy,
    optimizeImages,
    gulp.parallel(
        styles,
        html,
        scripts,
        svg,
        createWebp
    ),
)

// Default
export default gulp.series(
    clean,
    copy,
    copyImages,
    gulp.parallel(
        html,
        styles,
        scripts,
        svg,
        createWebp
    ),  
    server,
    watcher
)
