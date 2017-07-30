import gulp         from 'gulp';
import plumber      from 'gulp-plumber';
import eslint       from 'gulp-eslint';
import errorHandler from '../utils/errorHandler';
import settings     from '../settings';

gulp.task('eslint', () => {
    return gulp.src(settings.src.scripts + '/**/*.js')
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
});
