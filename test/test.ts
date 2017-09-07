import { expect, tap } from 'tapbundle'

import * as smartgulp from 'smartgulp'
let gulp = require('gulp')
import * as gulpFunction from '../ts/index'

let smartq = require('smartq')

tap.test('should run through smoothly with ' + "'forEach'", async (tools) => {
  let done = smartq.defer()
  let counter = 0
  gulp.src('./test/testfiles/*.md')
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
  smartgulp.src(['./test/testfiles/*.md'])
    .pipe(gulpFunction.atEnd(async () => {
      console.log('atEnd')
      done.resolve()
    }))
  await done.promise
})

tap.start()
