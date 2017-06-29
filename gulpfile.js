var
	gulp = require('gulp'),
	browserify = require('browserify'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	del = require( 'del'),
	uglify = require('gulp-uglify')
;

gulp.task( 'watch', function() {

	watch( 'example/sass/*.scss', function() {

		gulp.start( 'sass' );
	} );

	watch( 'src/**/*.js', function() {

		gulp.start( 'build' );
	} );
} );

gulp.task( 'sass', function() {
	return gulp.src( 'example/sass/**/*.scss' )
		.pipe( sass() )
		.pipe( autoprefixer( 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1' ) )
		.pipe( gulp.dest( 'example/style' ) )
	;
} );

gulp.task( 'build', function() {

	del( [ 'build/' ] );

	return browserify( 'src/example.js' )
		.transform( 'babelify', { presets: ['es2015'] } )
		.bundle()
		.pipe( source( 'example.js' ) )
		.pipe( buffer() )
		.pipe( uglify() )
		.pipe( gulp.dest( 'build' ) )
	;
} );

gulp.task( 'default', [ 'watch' ] );