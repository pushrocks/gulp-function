# gulp-function
accepts call to execute in gulp pipeline.

### Status
[![Build Status](https://travis-ci.org/pushrocks/gulp-function.svg?branch=v0.0.2)](https://travis-ci.org/pushrocks/gulp-function)
[![Dependency Status](https://david-dm.org/pushrocks/gulp-function.svg)](https://david-dm.org/pushrocks/gulp-function)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/gulp-function/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/gulp-function/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/gulp-function/badges/code.svg)](https://www.bithound.io/github/pushrocks/gulp-function)
[![Coverage Status](https://coveralls.io/repos/github/pushrocks/gulp-function/badge.svg?branch=master)](https://coveralls.io/github/pushrocks/gulp-function?branch=master)

### Version
[![GitHub version](https://badge.fury.io/gh/pushrocks%2Fgulp-function.svg)](https://badge.fury.io/gh/pushrocks%2Fgulp-function)
[![npm version](https://badge.fury.io/js/gulp-function.svg)](https://badge.fury.io/js/gulp-function)

### Usage
```javascript
var gulp = require("gulp");
var gulpFunction = require("gulp-function");
var Q = require("q");

var myFunction = function () {
    var done = Q.defer();
    console.log("Hello World!")
    
    // NOTE:
    // you can use done.resolve as callback function
    // of any async tasks within this function
    done.resolve();
    
    return done.promise;
}

gulp.task('gulpTest',function() {
    var stream = gulp.src('./mydir/*.something')
        .pipe(gulpFunction(myFunction,'forEach')) //read the notes below
        .pipe(gulp.dest("./build/"));
    return stream; // by returning the stream gulp knows when our task has finished.
});
```

> Note: The first argument of gulpFunction can also be an array of multiple functionnames.
Each function can return a promise. the pipe stop will finish when every promise is fullfilled.  
> Note: the second argument can be empty (defaults to 'forEach') or 'atEnd'