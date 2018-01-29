# gulp-function

accepts a function call as parameter to execute in gulp pipeline

## Availabililty

[![npm](https://pushrocks.gitlab.io/assets/repo-button-npm.svg)](https://www.npmjs.com/package/gulp-function)
[![git](https://pushrocks.gitlab.io/assets/repo-button-git.svg)](https://GitLab.com/pushrocks/gulp-function)
[![git](https://pushrocks.gitlab.io/assets/repo-button-mirror.svg)](https://github.com/pushrocks/gulp-function)
[![docs](https://pushrocks.gitlab.io/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/gulp-function/)

## Status for master

[![build status](https://GitLab.com/pushrocks/gulp-function/badges/master/build.svg)](https://GitLab.com/pushrocks/gulp-function/commits/master)
[![coverage report](https://GitLab.com/pushrocks/gulp-function/badges/master/coverage.svg)](https://GitLab.com/pushrocks/gulp-function/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/gulp-function.svg)](https://www.npmjs.com/package/gulp-function)
[![Dependency Status](https://david-dm.org/pushrocks/gulp-function.svg)](https://david-dm.org/pushrocks/gulp-function)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/gulp-function/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/gulp-function/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/gulp-function/badges/code.svg)](https://www.bithound.io/github/pushrocks/gulp-function)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

### Usage

```typescript
import gulp = require('gulp');
import gulpFunction from "gulp-function"; // default ES6 export
// import {forFirst, forEach, atEnd} from 'gulp-function'

let myAsyncFunction = async (file, enc) => {
  // await some async stuff
};

gulp.task("gulpTest", function() {
  let stream = gulp
    .src("./mydir/*.something")
    .pipe(gulpFunction(myFunction, "forEach")) //read the notes below
    // .pipe(forEach(myFunction)) // if imported as >> import { forEach } from 'gulp-function' <<
    .pipe(gulp.dest("./build/"));
  return stream; // by returning the stream gulp knows when our task has finished.
});
```

### Notes

* The first argument of gulpFunction can also be an **array of multiple functionnames**.
  Each function can return a promise. The pipe stop will finish when every promise is fullfilled.
  When providing an array of functions be careful with modifying the file object -> race condition
* The second argument can be empty, it defaults to "forEach"
* The following options are available:
  * "forFirst" - executes when first chunk/vinylfile of the stream reaches the pipestop.
    file is pushed further down the line when function's returned promise is fullfilled.
  * "forEach" - executes like "forFirst" but with every chunk/vinylfile in the stream;
  * "atEnd" - executes after all chunks have passed and are processed in full.
    That means the stream's "finish" event fires **before "atLast" is executed**!!!

For further information read the linked docs at the top of this README.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
> | By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy.html)

[![repo-footer](https://pushrocks.gitlab.io/assets/repo-footer.svg)](https://push.rocks)
