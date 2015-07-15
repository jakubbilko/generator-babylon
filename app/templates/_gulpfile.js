var gulp = require('gulp'),
    wiredep = require('wiredep').stream,
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    merge = require('merge-stream'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    isProduction = (process.env.ENV === 'production');

gulp.task('js', function () {
	var b = browserify({
		entries: 'app/scripts/main.js',
		debug: true,
		noParse: [require.resolve('babylonjs')]
	});
	return b.bundle()
	        .pipe(source('app.js'))
	        // Minification takes an extremely long time, so you have to set ENV=production in the environment
	        .pipe(gulpif(isProduction, buffer()))
	        .pipe(gulpif(isProduction, sourcemaps.init({loadMaps: true})))
	        .pipe(gulpif(isProduction, uglify()))
	        .pipe(gulpif(isProduction, sourcemaps.write('./')))
	        .pipe(gulp.dest('./dist/scripts/'));
});

gulp.task('serve', function() {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: 'dist',
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
