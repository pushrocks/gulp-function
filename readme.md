# @pushrocks/gulp-function
accepts a function call as parameter to execute in gulp pipeline

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@pushrocks/gulp-function)
* [gitlab.com (source)](https://gitlab.com/pushrocks/gulp-function)
* [github.com (source mirror)](https://github.com/pushrocks/gulp-function)
* [docs (typedoc)](https://pushrocks.gitlab.io/gulp-function/)

## Status for master
[![build status](https://gitlab.com/pushrocks/gulp-function/badges/master/build.svg)](https://gitlab.com/pushrocks/gulp-function/commits/master)
[![coverage report](https://gitlab.com/pushrocks/gulp-function/badges/master/coverage.svg)](https://gitlab.com/pushrocks/gulp-function/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/@pushrocks/gulp-function.svg)](https://www.npmjs.com/package/@pushrocks/gulp-function)
[![Known Vulnerabilities](https://snyk.io/test/npm/@pushrocks/gulp-function/badge.svg)](https://snyk.io/test/npm/@pushrocks/gulp-function)
[![TypeScript](https://img.shields.io/badge/TypeScript->=%203.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

## Usage

Please use TypeScript for best in class intellisense.

```typescript
import gulp = require('gulp');
import gulpFunction from 'gulp-function'; // default ES6 export
// import {forFirst, forEach, atEnd} from 'gulp-function'

let myAsyncFunction = async (file, enc) => {
  // await some async stuff
};

gulp.task('gulpTest', function() {
  let stream = gulp
    .src('./mydir/*.something')
    .pipe(gulpFunction(myAsyncFunction, 'forEach')) //read the notes below
    // .pipe(forEach(myAsyncFunction)) // if imported as >> import { forEach } from 'gulp-function' <<
    .pipe(gulp.dest('./build/'));
  return stream; // by returning the stream gulp knows when our task has finished.
});
```

### Notes

- The first argument of gulpFunction can also be an **array of multiple functionnames**.
  Each function can return a promise. The pipe stop will finish when every promise is fullfilled.
  When providing an array of functions be careful with modifying the file object -> race condition
- The second argument can be empty, it defaults to "forEach"
- The following options are available:
  - "forFirst" - executes when first chunk/vinylfile of the stream reaches the pipestop.
    file is pushed further down the line when function's returned promise is fullfilled.
  - "forEach" - executes like "forFirst" but with every chunk/vinylfile in the stream;
  - "atEnd" - executes after all chunks have passed and are processed in full.
    That means the stream's "finish" event fires **before "atLast" is executed**!!!

## Contribution

We are always happy for code contributions. If you are not the code contributing type that is ok. Still, maintaining Open Source repositories takes considerable time and thought. If you like the quality of what we do and our modules are useful to you we would appreciate a little monthly contribution: You can [contribute one time](https://lossless.link/contribute-onetime) or [contribute monthly](https://lossless.link/contribute). :)

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy)

[![repo-footer](https://lossless.gitlab.io/publicrelations/repofooter.svg)](https://maintainedby.lossless.com)
