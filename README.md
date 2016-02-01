# gulp-function
accepts call to execute in gulp pipeline.

### build status/Dependencies
[![Build Status](https://travis-ci.org/pushrocks/gulp-function.svg?branch=v0.0.2)](https://travis-ci.org/pushrocks/gulp-function)
[![Dependency Status](https://david-dm.org/pushrocks/gulp-function.svg)](https://david-dm.org/pushrocks/gulp-function)
[![devDependency Status](https://david-dm.org/pushrocks/gulp-function/dev-status.svg)](https://david-dm.org/pushrocks/gulp-function#info=devDependencies)

### Usage
```javascript
var gulp = require("gulp");
var gulpFunction = require("gulp-function");

var myFunction = function () {
    console.log("Hello World!")
}

gulp.task('gulpTest',function() {
    gulp.src('./mydir/*.something')
        .pipe(gulpFunction(myFunction,'forEach'))
        .pipe(gulp.dest("./build/"))
});
```

>Note: The first argument of gulpFunction can also be an array of multiple functionnames.  
>Note: the second argument can be empty (defaults to 'forEach') or 'atEnd'