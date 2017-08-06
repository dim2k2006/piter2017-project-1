import gulp         from 'gulp';
import plumber      from 'gulp-plumber';
import uglify       from 'gulp-uglify';
import sourcemaps   from 'gulp-sourcemaps';
import concat       from 'gulp-concat';
import babel        from 'gulp-babel';
import errorHandler from '../utils/errorHandler';
import settings     from '../settings';

gulp.task('formValidation', () => {
    return gulp.src(settings.src.scripts + '/formValidation/*.js')
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(sourcemaps.init())
        .pipe(concat('formValidation.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(settings.dist.scripts));
});
