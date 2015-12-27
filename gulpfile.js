var gulp = require('gulp');
var browserify = require('browserify');
var tap = require('gulp-tap');

gulp.task('default', ['build_scripts']);

gulp.task('build_scripts', function() {
    return gulp.src('scripts/*')
        .pipe(tap(
            function(file){
                var bundler = browserify({
                    entries: [file.path],
                    fullpaths: true,
                    debug: true,
                    transform: ['reactify'],
                    cache: {},
                    packagecache: {},
                });
                file.contents = bundler.bundle();
            })
         )
        .pipe(gulp.dest('public/js/'));
});
