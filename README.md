# gulp-function
accepts call to execute in gulp pipeline.

### Status
[![Build Status](https://travis-ci.org/pushrocks/gulp-function.svg?branch=v0.0.2)](https://travis-ci.org/pushrocks/gulp-function)
[![Dependency Status](https://david-dm.org/pushrocks/gulp-function.svg)](https://david-dm.org/pushrocks/gulp-function)
[![devDependency Status](https://david-dm.org/pushrocks/gulp-function/dev-status.svg)](https://david-dm.org/pushrocks/gulp-function#info=devDependencies)
[![bitHound Code](https://www.bithound.io/github/pushrocks/gulp-function/badges/code.svg)](https://www.bithound.io/github/pushrocks/gulp-function)
[![Coverage Status](https://coveralls.io/repos/github/pushrocks/gulp-function/badge.svg?branch=master)](https://coveralls.io/github/pushrocks/gulp-function?branch=master)

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
    gulp.src('./mydir/*.something')
        .pipe(gulpFunction(myFunction,'forEach')) //read the notes below
        .pipe(gulp.dest("./build/"))
});
```

> Note: The first argument of gulpFunction can also be an array of multiple functionnames.
Each function can return a promise. the pipe stop will finish when every promise is fullfilled.  
> Note: the second argument can be empty (defaults to 'forEach') or 'atEnd'