import gulp         from 'gulp';
import browserify   from 'browserify';
import source       from 'vinyl-source-stream';
import buffer       from 'vinyl-buffer';
import babelify     from 'babelify';
import uglify       from 'gulp-uglify';
import sourcemaps   from 'gulp-sourcemaps';
import errorHandler from '../utils/errorHandler';
import settings     from '../settings';

gulp.task('scripts', () => {
    const b = browserify({
        entries: `./src/js/main.js`,
        debug: true
    });

    return b.transform(babelify, {presets: ["es2015"]}).bundle()
        .on('error', errorHandler)
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(settings.dist.scripts));
});
