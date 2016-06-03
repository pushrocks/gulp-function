# gulp-function
accepts call to execute in gulp pipeline.

### Status
[![build status](https://gitlab.com/pushrocks/gulp-function/badges/master/build.svg)](https://gitlab.com/pushrocks/gulp-function/commits/master)
[![Dependency Status](https://david-dm.org/pushrocks/gulp-function.svg)](https://david-dm.org/pushrocks/gulp-function)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/gulp-function/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/gulp-function/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/gulp-function/badges/code.svg)](https://www.bithound.io/github/pushrocks/gulp-function)
[![codecov.io](https://codecov.io/github/pushrocks/gulp-function/coverage.svg?branch=master)](https://codecov.io/github/pushrocks/gulp-function?branch=master)

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

### Notes:

* The first argument of gulpFunction can also be an **array of multiple functionnames**.
Each function can return a promise. The pipe stop will finish when every promise is fullfilled.  
* The second argument can be empty, it defaults to "forEach"
* The following options are available:
    * "forFirst" - executes when first chunk/vinylfile of the stream reaches the pipestop.
       file is pushed further down the line when function's returned promise is fullfilled.
    *  "forEach" - executes like "forFirst" but with every chunk/vinylfile in the stream;
    *  "atEnd" - executes after all chunks have passed and are processed in full.
       That means the stream's "finish" event fires **before "atLast" is executed**!!!