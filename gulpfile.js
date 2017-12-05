var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default',['start']);

gulp.task('start', function () {
  nodemon({
    script: 'index.js'
  , ext: 'js ejs'
  , env: { 'NODE_ENV': 'development' }
  })
});