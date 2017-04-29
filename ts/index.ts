import 'typings-global'
import * as q from 'smartq'
import * as through2 from 'through2'
import { Transform } from 'stream'

export type TExecutionMode = 'forEach' | 'forFirst' | 'atEnd'

export interface IPromiseFunction {
  (file?, enc?): PromiseLike<any>
}

let defaultExport = (
  functionsToExecuteArg: IPromiseFunction | IPromiseFunction[],
  executionModeArg: TExecutionMode = 'forEach'
): Transform => {

  let promiseArray = []
  let runFunction = function (functionArg, file, enc) {
    let returnValue = functionArg(file, enc)
    if (typeof returnValue !== 'undefined' && typeof returnValue.then !== 'undefined') {
      promiseArray.push(returnValue)
    }
  }

  let checkAndRunFunction = function (file, enc) {
    if (typeof functionsToExecuteArg === 'function') {
      runFunction(functionsToExecuteArg, file, enc)
    } else if (Array.isArray(functionsToExecuteArg)) {
      for (let anyFunction in functionsToExecuteArg) {
        runFunction(functionsToExecuteArg[ anyFunction ], file, enc)
      }
    } else {
      throw new Error('gulp-callfunction: something is strange with the given arguments')
    }
    return Promise.all(promiseArray)
  }

  let hasExecutedOnce = false
  let forEach = function (file, enc, cb) { // the forEach function is called for every chunk
    switch (executionModeArg) {
      case 'forEach':
        checkAndRunFunction(file, enc).then(function () {
          cb(null, file)
        })
        break
      case 'forFirst':
        if (hasExecutedOnce) {
          checkAndRunFunction(file, enc)
            .then(function () {
              cb(null, file)
            })
        } else {
          cb(null, file)
        }
        hasExecutedOnce = true
        break
      case 'atEnd':
        cb()
        break
      default:
        break
    }
  }

  let atEnd = function (cb) {
    if (executionModeArg === 'atEnd') {
      checkAndRunFunction(null, null).then(function () {
        cb()
      })
    } else {
      cb()
    }
  }
  return through2.obj(forEach, atEnd)
}

export let forEach = (funcArg: IPromiseFunction) => {
  return defaultExport(funcArg, 'forEach')
}

export let forFirst = (funcArg: IPromiseFunction) => {
  return defaultExport(funcArg, 'forFirst')
}

export let atEnd = (funcArg: IPromiseFunction) => {
  return defaultExport(funcArg, 'atEnd')
}

export default defaultExport
