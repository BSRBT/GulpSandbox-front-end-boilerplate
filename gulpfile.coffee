gulp = require 'gulp'
pug = require 'gulp-pug'
connect = require 'gulp-connect'
stylus = require 'gulp-stylus'
uglify = require 'gulp-uglify'
clean = require 'gulp-clean'
rjs = require 'gulp-requirejs'
plumber = require 'gulp-plumber'
autoprefixer = require 'gulp-autoprefixer'
sourcemaps = require 'gulp-sourcemaps'
prettify = require 'gulp-prettify'
changed = require 'gulp-changed'
rupture = require 'rupture'
nib = require 'nib'

gulp.task 'compileCurrentStyle', ->
 	return gulp.src 'dev/stylus/main.styl'
   .pipe changed 'dist/css'
  	.pipe do sourcemaps.init
  	.pipe do plumber
  	.pipe stylus use: rupture nib set: ['compress']
  	.pipe autoprefixer set: ['last 2 versions']
  	.pipe do sourcemaps.write
  	.pipe gulp.dest 'dist/css'
  	.pipe do connect.reload



gulp.task 'compileCurrentTheme', ->
  return gulp.src 'dev/pug/*.pug'
   .pipe changed 'dist'
   .pipe do plumber
   .pipe do pug
   .pipe prettify indent_char: ' ', indent_size: 4
   .pipe gulp.dest 'dist'
   .pipe do connect.reload

gulp.task 'connect', ->
	connect.server
		port: 1337
		livereload: on
		root: './dist'

	gulp.src 'js/', read: no
		.pipe do clean


gulp.task 'watch', ->
	gulp.watch 'dev/pug/**/*.pug', ['compileCurrentTheme']
	gulp.watch 'dev/stylus/**/*.styl', ['compileCurrentStyle']



gulp.task 'default', ['compileCurrentTheme', 'compileCurrentStyle', 'connect', 'watch']
