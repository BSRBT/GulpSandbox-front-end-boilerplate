gulp = require 'gulp'
pug = require 'gulp-pug'
connect = require 'gulp-connect'
stylus = require 'gulp-stylus'
coffee = require 'gulp-coffee'
uglify = require 'gulp-uglify'
clean = require 'gulp-clean'
rjs = require 'gulp-requirejs'
plumber = require 'gulp-plumber'
autoprefixer = require 'gulp-autoprefixer'
sourcemaps = require 'gulp-sourcemaps'
prettify = require 'gulp-prettify'
changed = require 'gulp-changed'



gulp.task 'compileCurrentStyle', ->
 	return gulp.src 'dev/stylus/main.styl'
   .pipe changed 'dist/css'
  	.pipe do sourcemaps.init
  	.pipe do plumber
  	.pipe stylus set: ['compress']
  	.pipe autoprefixer set: ['last 2 versions']
  	.pipe do sourcemaps.write
    # .pipe do sourcemaps.write('.')
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

gulp.task 'coffee', ->
	gulp.src 'dev/coffee/*.coffee'
	.pipe do plumber
	.pipe do coffee
	.pipe gulp.dest 'js'


gulp.task 'build', ['coffee'], ->
	rjs
	  baseUrl: 'js'
	  name: '../bower_components/almond/almond'
	  include: ['main']
	  insertRequire: ['main']
	  out: 'all.js'
	  wrap: on
	.pipe do uglify
	.pipe gulp.dest 'dist/js'


	gulp.src 'js/', read: no
		.pipe do clean


gulp.task 'watch', ->
	gulp.watch 'dev/pug/**/*.pug', ['compileCurrentTheme']
	gulp.watch 'dev/stylus/**/*.styl', ['compileCurrentStyle']
	gulp.watch 'dev/coffee/*.coffee', ['build']



gulp.task 'default', ['compileCurrentTheme', 'compileCurrentStyle', 'build', 'connect', 'watch']
