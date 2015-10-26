# gulp-callfunction
accepts call to execute in gulp pipeline.

### build status/Dependencies
[![Build Status](https://travis-ci.org/pushrocks/gulp-callfunction.svg?branch=v0.0.2)](https://travis-ci.org/pushrocks/gulp-callfunction)
[![Dependency Status](https://david-dm.org/pushrocks/gulp-callfunction.svg)](https://david-dm.org/pushrocks/gulp-callfunction)

### Usage
```javascript
var gulp = require("gulp");
var gulpCallFunction = require("gulp-callfunction");

var myFunction = function () {
    console.log("Hello World!")
}

gulp.task('gulpTest',function() {
    gulp.src('./mydir/*.something')
        .pipe(gulpCallFunction(myFunction,'forEach'))
        .pipe(gulp.dest("./build/"))
});
```

>Note: The first argument of gulpCallFunction can also be an array of multiple functionnames.  
>Note: the second argument can be empty (defaults to 'forEach') or 'atEnd'