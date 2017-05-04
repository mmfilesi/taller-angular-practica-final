/* Importamos gulp */
const gulp        = require('gulp');
const gulpIf      = require('gulp-if');
/* Importamos las herramientas que vamos a utilizar */
const eslint      = require('gulp-eslint');
const useref      = require('gulp-useref');
const concat      = require('gulp-concat');
const uglify      = require('gulp-uglify');
const browserSync = require('browser-sync').create();
var runSequence   = require('run-sequence');
const reload      = browserSync.reload;
/* Importamos las cosas esas de los CSS */
var sass          = require('gulp-sass');
var postcss       = require('gulp-postcss');
var sourcemaps    = require('gulp-sourcemaps');

/* En src trabajamos y en dist preparamos toda la aplicación para producción */
// concatenamos y uglificamos el js
gulp.task('buildScripts', () => {
  return gulp.src('src/index.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'));
});

// copiamos tal cual todo lo demás
gulp.task('buildStatics', () => {
  return gulp.src(['src/**', '!src/**/*.js', '!src/index.html'])
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['buildStatics', 'buildScripts'], function() {
});

/* Lint para la validación formal del código */
gulp.task('lint', () => {
  return gulp.src(['src/**/*.js','!mocks/**', '!vendor/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/* CSS */
// Post CSS
var processorsArray = [
  require('autoprefixer')({ browsers:
    [
      "Android >= 4",
      "Chrome >= 47",
      "Firefox >= 43",
      "Explorer >= 11",
      "iOS >= 7.1",
      "Opera >= 12.1",
      "Safari >= 9"
    ]
  })
  // ,
  // require('cssnano')({})
];
// SASS
gulp.task('sass', function() {
  return gulp.src('src/app/styles/sass/main.scss')
  .pipe( sourcemaps.init() )
  .pipe(sass.sync().on('error', sass.logError))
  .pipe( postcss(processorsArray) )
  .pipe( sourcemaps.write('.') )
  .pipe(gulp.dest('src/app/styles'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

/* Server */
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src',
      index: 'index.html',
      https: false
    },
  });
});

/* Watches */
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('src/app/styles/**/*.scss', ['sass']);
  gulp.watch('src/**/*.html', browserSync.reload);
  gulp.watch('src/**/*.js', browserSync.reload);
})

/* Default task */
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync','watch'],
    callback
  )
})
