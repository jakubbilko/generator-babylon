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

gulp.task('html', function() {
	return gulp.src('app/*.html')
	           .pipe(gulp.dest('dist/'));
});

gulp.task('css', function() {
	return gulp.src('app/css/*.css')
	           .pipe(gulpif(isProduction, minifyCss()))
	           .pipe(gulp.dest('dist/css'));
});

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

gulp.task('watch', function() {
	gulp.watch('app/*.html', ['html']);
	gulp.watch('app/css/*.css', ['css']);
	gulp.watch('app/*.js', ['js']);
	gulp.watch('app/assets/*', ['assets']);
});

gulp.task('browserSync', ['build'], function() {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: 'dist'
		}
	});
});

gulp.task('serve', ['browserSync', 'watch'], function() {
	gulp.watch(['dist/*.html', 'dist/scripts/*.js', 'dist/css/*.css']).on('change', reload);
});

gulp.task('assets', function() {
	return gulp.src('app/assets/**/*').pipe(gulp.dest('dist/assets/'));
});

gulp.task('clean', require('del').bind(null, ['dist']));

gulp.task('build', ['html', 'css', 'js', 'assets']);
