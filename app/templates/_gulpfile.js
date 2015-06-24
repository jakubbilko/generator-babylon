var gulp = require('gulp'),
    wiredep = require('wiredep').stream,
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    merge = require('merge-stream');

gulp.task('wiredep', function() {
	gulp.src('./app/index.html')
	    .pipe(wiredep())
	    .pipe(gulp.dest('./app'));
});

gulp.task('serve', function() {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: 'app',
			routes: {
				'/bower_components': 'bower_components'
			}
		}
	});
	gulp.watch(['app/*.html', 'app/scripts/*.js', 'app/css/*.css']).on('change', reload);
	gulp.watch('bower.json', ['wiredep']);
});

gulp.task('assets', function() {
	return gulp.src('app/assets/**/*').pipe(gulp.dest('dist/assets/'));
});

gulp.task('clean', require('del').bind(null, ['dist']));

gulp.task('dist', ['clean'], function() {
	var assets = useref.assets();

	var stream1 = gulp.src('app/*.html')
	                  .pipe(assets)
	                  .pipe(gulpif('*.js', uglify()))
	                  .pipe(gulpif('*.css', minifyCss()))
	                  .pipe(assets.restore())
	                  .pipe(useref())
	                  .pipe(gulp.dest('dist'));

	var stream2 = gulp.src('app/assets/**/*').pipe(gulp.dest('dist/assets/'));

	return merge(stream1, stream2);
});
