import { expect, tap } from '@pushrocks/tapbundle';

import * as smartgulp from '@pushrocks/smartgulp';
let gulp = require('gulp');
import * as gulpFunction from '../ts/index';

import * as smartpromise from '@pushrocks/smartpromise';

tap.test('should run through smoothly with ' + "'forEach'", async tools => {
  let done = smartpromise.defer();
  let counter = 0;
  gulp.src('./test/testfiles/*.md').pipe(
    gulpFunction.forEach(async () => {
      counter++;
      if (counter === 2) {
        done.resolve();
      }
    })
  );
  await done.promise;
});

tap.test('should run through smoothly with ' + "'forEach'", async tools => {
  let done = smartpromise.defer();
  let counter = 0;
  smartgulp.src(['./test/testfiles/*.md']).pipe(
    gulpFunction.atEnd(async () => {
      console.log('atEnd');
      done.resolve();
    })
  );
  await done.promise;
});

tap.start();
