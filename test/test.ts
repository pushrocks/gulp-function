import { expect, tap } from 'tapbundle'

let gulp = require('gulp')
import * as gulpFunction from '../dist/index'

import * as beautylog from 'beautylog'
let smartq = require('smartq')


tap.test('should run through smoothly with ' + "'forEach'", async (tools) => {
  let done = smartq.defer()
  let counter = 0
  gulp.src('./test/*.md')
    .pipe(gulpFunction.forEach(async () => {
      counter++
      if (counter === 2) {
        done.resolve()
      }
    }))
  await done.promise
})

tap.test('should run through smoothly with ' + "'forEach'", async (tools) => {
  let done = smartq.defer()
  let counter = 0
  gulp.src('./test/*.md')
    .pipe(gulpFunction.atEnd(async () => {
      console.log('atEnd')
      done.resolve()
    }))
  await done.promise
})

tap.start()
