var gulp = require('gulp');

// render handlebars templates
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var data = require('gulp-data');

gulp.task('template', function(){

  var templateData = {
        firstName: 'Adam'
    },
    options = {
        batch : ['./templates/partials'],
        helpers : {
          // place template helper functions here
        }
    };

    // compile all templats in templates dir except partials
    return gulp.src([
      './templates/**/*.hbs',
      '!./templates/partials/**/*'
      ])
        // read data from sip.json
        .pipe(data(function(file) {
          return require('./sip.json');
        }))
        .pipe(handlebars(data, options))
        // give the files an .html extention
        .pipe(rename(function (path) {
          path.extname = '.html';
        }))
        .pipe(gulp.dest('dist'));

});

gulp.task('default', ['template']);