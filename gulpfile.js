let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var pump = require('pump');

var watch = require('gulp-watch');
var exec = require('child_process').exec;


 
gulp.task('minify-css',() => {
  return gulp.src('front/styles/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/styles'));
});


gulp.task('compress', function (cb) {
  pump([
        gulp.src('front/scripts/*.js'),
        uglify(),
        gulp.dest('public/scripts')
    ],
    cb
  );
});

gulp.task('watch', function () {
  // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
  return watch('front/**/*.*', function () {
    gulp.start('compress');
    gulp.start('minify-css');
  });
});

gulp.task('nodestart', function (cb) {
  exec('node bin/www', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})


gulp.task(
  'default',
  ['nodestart', 'compress', 'minify-css','watch']
);
