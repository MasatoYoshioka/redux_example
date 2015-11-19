'use strict';

var gulp = require('gulp');

var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');

var b = browserify({
  entries: ['./src/app/index.js'],
  cache: {},
  packageCache: {},
  verbose: true,
  debug: true
});

b.on('update', bundle);
b.transform("babelify");

function bundle() {
    console.log( 'bundle' );
    b.bundle()
    .on('error', function(err){
        console.log(err.message);
        console.log(err.stack);
    })
    .pipe(fs.createWriteStream('./www/dest/bundle.js'))
    ;
}

/* gulp tasks */
gulp.task('default', bundle );

gulp.task('watch', function(){
    b.plugin(watchify);
    bundle();
});
