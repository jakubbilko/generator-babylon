var gulp = require('gulp');
var wiredep = require('wiredep').stream;

gulp.task('wiredep', function() {
	gulp.src('./app/index.html').
	pipe(wiredep()).
	pipe(gulp.dest('./app'));
});