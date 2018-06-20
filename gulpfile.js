var srcFolder = './src/'
  , assetsFolder = './assets/'
  , gulp = require('gulp')
  , browserSync = require('browser-sync').create()
  , rename = require("gulp-rename")
  , sass = require('gulp-sass')
  , cssnano = require('gulp-cssnano')
  , jsmin = require('gulp-jsmin')
  , prefix = require('gulp-autoprefixer')
  , plumber = require('gulp-plumber')
  , pug = require('gulp-pug')
  , reload = browserSync.reload

gulp.task('browser-sync', function () {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './'
    }
  })
  gulp.watch(srcFolder + 'pug/**/*.pug', ['html'])
  gulp.watch(srcFolder + 'sass/**/*.sass', ['css'])
  gulp.watch(srcFolder + 'js/**/*.js', ['js'])
})

gulp.task('css', () => {
  return gulp.src(srcFolder + 'sass/main.sass')
  .pipe(plumber([{ errorHandler: false }]))
  .pipe(sass())
  .pipe(rename({suffix: '.min', prefix: ''}))
  .pipe(prefix({
    browsers: ['last 2 versions']
  }))
  .pipe(cssnano())
  .pipe(gulp.dest(assetsFolder + 'css'))
  .pipe(browserSync.stream())
})

gulp.task('js', () => {
  return gulp.src(srcFolder + 'js/**/*.js')
  .pipe(jsmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(assetsFolder + 'js'));
})

gulp.task('html', () => {
  return gulp.src(srcFolder + 'pug/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('./'))
  .on('end', reload)
})

gulp.task('default', ['browser-sync', 'html', 'css', 'js'])