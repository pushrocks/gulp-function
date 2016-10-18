# gulp-function
accepts call to execute in gulp pipeline.

## Availabililty
[![npm](https://push.rocks/assets/repo-button-npm.svg)](https://www.npmjs.com/package/gulp-function)
[![git](https://push.rocks/assets/repo-button-git.svg)](https://gitlab.com/pushrocks/gulp-function)
[![git](https://push.rocks/assets/repo-button-mirror.svg)](https://github.com/pushrocks/gulp-function)
[![docs](https://push.rocks/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/gulp-function/)

## Status for master
[![build status](https://gitlab.com/pushrocks/gulp-function/badges/master/build.svg)](https://gitlab.com/pushrocks/gulp-function/commits/master)
[![coverage report](https://gitlab.com/pushrocks/gulp-function/badges/master/coverage.svg)](https://gitlab.com/pushrocks/gulp-function/commits/master)
[![Dependency Status](https://david-dm.org/pushrocks/gulp-function.svg)](https://david-dm.org/pushrocks/gulp-function)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/gulp-function/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/gulp-function/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/gulp-function/badges/code.svg)](https://www.bithound.io/github/pushrocks/gulp-function)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

### Usage
```javascript
import * as gulp from 'gulp';
import gulpFunction from 'gulp-function' // default ES6 export
let Q = require("q");

let myFunction = function (file, enc) { // file and enc are optional in case you want to modify the file object
    let done = Q.defer();
    console.log("Hello World!")
    
    // NOTE:
    // you can use done.resolve as callback function
    // of any async tasks within this function
    done.resolve();
    
    return done.promise;
}

gulp.task('gulpTest',function() {
    let stream = gulp.src('./mydir/*.something')
        .pipe(gulpFunction(myFunction,'forEach')) //read the notes below
        .pipe(gulp.dest("./build/"));
    return stream; // by returning the stream gulp knows when our task has finished.
});
```

### Notes:

* The first argument of gulpFunction can also be an **array of multiple functionnames**.
Each function can return a promise. The pipe stop will finish when every promise is fullfilled.
When providing an array of functions be careful with modifying the file object -> race condition
* The second argument can be empty, it defaults to "forEach"
* The following options are available:
    * "forFirst" - executes when first chunk/vinylfile of the stream reaches the pipestop.
       file is pushed further down the line when function's returned promise is fullfilled.
    *  "forEach" - executes like "forFirst" but with every chunk/vinylfile in the stream;
    *  "atEnd" - executes after all chunks have passed and are processed in full.
       That means the stream's "finish" event fires **before "atLast" is executed**!!!

[![npm](https://push.rocks/assets/repo-header.svg)](https://push.rocks)
