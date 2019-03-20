const gulp = require('gulp')
const grun = require('gulp-run')
const webpack = require('webpack-stream')
const webpackConfig = require('./webpack.config.js')
const buildExample = require('./src/tasks/build-example')

// function cleanDist () {
//   run('rm -r dist/components/*').exec()
// }

function buildCss () {
  return gulp.src('src/style/index.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/'))
}

gulp.task('watch', () => {
  gulp.watch('examples/**/*.html').on('change', gulp.parallel(buildExample))
  gulp.watch('src/style/**', gulp.series(buildCss))
})

gulp.task('serve', () => {
  return run('node index.js').exec()
})

gulp.task('default', callback => {
  return gulp.parallel(
    'serve',
    'build',
    'watch'
  )(callback)
})

function run (command) {
  return grun(command, {
    verbosity: 3
  })
}

exports.build = gulp.parallel(
  // cleanDist,
  buildExample,
  buildCss
)
