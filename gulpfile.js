import gulp from 'gulp';
import clean from 'gulp-clean';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import gulpCleanCss from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import gulpUglify from 'gulp-uglify';
import gulpRename from 'gulp-rename';
import browserSync from 'browser-sync';
import dartSass from 'sass';
const sass = gulpSass(dartSass);

//PATHS----------------------------------------
const paths = {
    src: {
        styles: 'src/scss/**/*.scss',
        html: './index.html'
    },
    dist: {
        self: 'dist',
        styles: 'dist/styles',
    }
};

//FUNCTIONS--------------------------------------
const cleanBuild = () => (
    gulp.src(paths.dist.self, {allowEmpty: true})
        .pipe(clean())
);

const scssBuildMin = () => (
    gulp.src(paths.src.styles)
        .pipe(sass({
                outputStyle: 'compressed'
            }
        ).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulpRename({suffix: '.min'}))
        .pipe(gulpCleanCss())
        .pipe(gulp.dest(paths.dist.styles))
        .pipe(browserSync.stream())
);

const js = () => (
    gulp.src("src/js/*.js")
        .pipe(gulpRename('scripts.min.js'))
        .pipe(gulpUglify())
        .pipe(gulp.dest("dist/js"))
);

const imgMin = () => (
    gulp.src('./src/img/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('./dist/img/'))
);

const watcher = () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(paths.src.styles, scssBuildMin).on('change', browserSync.reload);
    gulp.watch('src/js/*.js', js).on('change', browserSync.reload);
    gulp.watch('./src/img/**/*.+(png|jpg|gif|svg)', imgMin).on('change', browserSync.reload);
    gulp.watch(paths.src.html).on('change', browserSync.reload);
};

//TASKS---------------------------------------
gulp.task('build', gulp.series(
    cleanBuild,
    js,
    imgMin,
    scssBuildMin
));

gulp.task('dev', watcher);
