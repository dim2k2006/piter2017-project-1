import gulp         from 'gulp';
import settings     from '../settings';

gulp.task('copy', () => {
    gulp.src(settings.src.fonts + '/**')
        .pipe(gulp.dest(settings.dist.fonts));

    gulp.src(settings.src.server + '/**')
        .pipe(gulp.dest(settings.dist.server));

    return true;
});
