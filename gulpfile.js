const gulp = require('gulp'),
	  connect = require('gulp-connect'),
	  plumber = require('gulp-plumber'),
	  sass = require('gulp-sass'),
	  autoprefixer = require('gulp-autoprefixer'),
	  csso = require('gulp-csso'),
	  imagemin = require('gulp-imagemin'),
	  rename = require('gulp-rename'),
	  dirs = {
	  	'source': {
	  		'html': 'source/index.html',
	  		'css': 'source/scss/**/*.scss',
	  		'img': 'source/img/*',
	  		'fonts': 'source/fonts/*'
	  	},
	  	'build': {
	  		'html': 'build/',
	  		'css': 'build/css/',
	  		'img': 'build/img/',
	  		'fonts': 'build/fonts/'
	  	}
	  };


gulp.task('html', function() {
	return gulp.src(dirs.source.html).pipe(gulp.dest(dirs.build.html)).pipe(connect.reload());
});

gulp.task('styles', function() {
	return gulp.src(dirs.source.css)
			   .pipe(plumber())
			   .pipe(sass())
	    	   .pipe(autoprefixer({
				 	browsers: ['last 2 versions', 'IE 10', 'IE 11'],
				 	cascade: false
			   }))
			   .pipe(csso({
				 	sourceMap: true
			   }))
			   .pipe(gulp.dest(dirs.build.css))
			   .pipe(connect.reload());
});

gulp.task('images', function() {
	return gulp.src(dirs.source.img)
			   .pipe(imagemin({
				 	verbose: true
			   }))
			   .pipe(gulp.dest(dirs.build.img))
			   .pipe(connect.reload());
});

gulp.task('fonts', function() {
	return gulp.src(dirs.source.fonts)
			   .pipe(gulp.dest(dirs.build.fonts))
			   .pipe(connect.reload());
});

gulp.task('connect', function() {
	connect.server({
		root: 'build',
		livereload: true
	});
});

gulp.task('watch', function() {
	gulp.watch(dirs.source.html, ['html']);
	gulp.watch(dirs.source.css, ['styles']);
	gulp.watch(dirs.source.img, ['images']);
	gulp.watch(dirs.source.fonts, ['fonts']);
});

gulp.task('default', ['html', 'styles', 'images', 'fonts', 'connect', 'watch']);