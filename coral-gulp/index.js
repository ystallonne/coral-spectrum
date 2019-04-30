module.exports = function(gulp) {
  'use strict';
  
  // Tasks
  require('./tasks/clean.js')(gulp);
  require('./tasks/lint.js')(gulp);
  require('./tasks/a11y.js')(gulp);
  require('./tasks/examples.js')(gulp);
  require('./tasks/docs.js')(gulp);
  require('./tasks/deploy.js')(gulp);
  require('./tasks/templates.js')(gulp);
  require('./tasks/styles.js')(gulp);
  require('./tasks/scripts.js')(gulp);
  require('./tasks/minify.js')(gulp);
  require('./tasks/tests.js')(gulp);
  require('./tasks/watch.js')(gulp);
  require('./tasks/release.js')(gulp);
  
  gulp.task('build',
    gulp.series(
      gulp.parallel('clean', 'lint'),
      gulp.parallel('styles', 'templates'),
      'scripts'
    )
  );
  
  gulp.task('test',
    gulp.series(
      gulp.parallel('clean', 'lint'),
      gulp.parallel('styles', 'templates'),
      'karma'
    )
  );

  gulp.task('dev',
    gulp.series(
      gulp.parallel('clean', 'lint'),
      gulp.parallel('styles', 'templates'),
      'karma',
      'scripts',
      'watch'
    )
  );

  gulp.task('default',
    gulp.series(
      'build',
      'watch'
    )
  );
};
