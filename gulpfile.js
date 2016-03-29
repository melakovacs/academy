'use strict';
var gulp        = require('gulp');
var runSeq      = require('run-sequence')
var config      = require('./gulp/config')();
var t           = require('./gulp/utils/tasksHelpers')(gulp, config);

///////////////
//   Build   //
///////////////

// Cleans the build folder
gulp.task('clean', t.getTask('clean'));

// Moves all the assets to the build
gulp.task('build:assets', t.getTask('assets'));

// Concatenates all the content files
gulp.task('build:content', t.getTask('content'));

// Generate all pages from the jade files
gulp.task('build:pages', t.getTask('pages'));

// Generate all stylesheets from the sass files
gulp.task('build:styles', t.getTask('styles'));

// Move all javscript files to the build
gulp.task('build:scripts', t.getTask('scripts'));

gulp.task(
  'build',
  gulp.series(
    'clean',
    gulp.parallel(
      gulp.series(
        'build:content',
        'build:pages'
      ),
      'build:assets',
      'build:styles',
      'build:scripts'
    )
  )
);


//////////
// Test //
//////////

// Moves all the assets to the build
gulp.task('test:accessibility', t.getTask('accessibility'));

// Tests the built project in terms of accessibility.
gulp.task(
  'test',
  gulp.series(
    'build',
    'test:accessibility'
  )
);


////////////
// Deploy //
////////////

gulp.task('deploy', t.getTask('deploy'));


/////////////
//  Others  //
/////////////

// Serve the build folder
gulp.task('serve', t.getTask('serve'));

// Lints the gulp tasks
gulp.task('tasks', t.getTask('tasks'));

// gulp.tasks('heroku:prod', [default]);

gulp.task(
  'default',
  gulp.series(
    'build',
    'serve'
  )
);

