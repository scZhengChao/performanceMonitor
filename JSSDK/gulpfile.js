const gulp = require('gulp')
const uglify = require('gulp-uglify-es').default
let rename = require('gulp-rename')
gulp.task('uglify', function () {
  return gulp.src('paMonitor.js')
    .pipe(rename('paMonitor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})

gulp.task('default', gulp.parallel('uglify'))
