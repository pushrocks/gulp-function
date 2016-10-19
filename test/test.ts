import 'typings-test'
let gulp = require('gulp')
import gulpFunction from '../dist/index'

import * as beautylog from 'beautylog'
let Q = require('q')

let myFunction = function () {
    let done = Q.defer()
    beautylog.log('Function executed')
    done.resolve()
    return done.promise
}
let myFunction2 = function () {
    let done = Q.defer()
    beautylog.ok('Function2 executed')
    done.resolve()
    return done.promise
}
let myFunction3 = function () {
    let done = Q.defer()
    beautylog.success('Function3 executed')
    done.resolve()
    return done.promise
}

let beforeFunction = function () {
    let done = Q.defer()
    beautylog.success('beforeFunction executed')
    done.resolve()
    return done.promise
}

let middleFunctionRun = false

let middleFunction = function () {
    let done = Q.defer()
    beautylog.success('middleFunction executed')
    setTimeout(function(){
        beautylog.log('timeout fired')
        middleFunctionRun = true
        done.resolve()
    }, 500)
    return done.promise
}

let afterFunction = function () {
    let done = Q.defer()
    beautylog.success('afterFunction executed')
    done.resolve()
    return done.promise
}

let timeoutFunction = function(){
    let done = Q.defer()
    setTimeout(function(){
        beautylog.log('largeTimeout fired')
        done.resolve()
    },2000)
    return done.promise
}



describe('gulpFunction',function(){
    it('should run through smoothly with ' + "'forEach'",function(done){
        gulp.src('./test/*.md')
            .pipe(gulpFunction(myFunction,'forEach'))
            .pipe(gulp.dest('./test/result/'))

        gulp.src('./test/*.md')
            .pipe(gulpFunction([myFunction2,myFunction3],'forEach'))
            .pipe(gulp.dest('./test/result/'))
            .pipe(gulpFunction(done,'atEnd'))

    })

    it('should run through smoothly with ' + "'atEnd'",function(done){
        gulp.src('./test/*.md')
            .pipe(gulpFunction(myFunction,'atEnd'))
            .pipe(gulp.dest('./test/result/'))

        gulp.src('./test/*.md')
            .pipe(gulpFunction([myFunction2,myFunction3],'atEnd'))
            .pipe(gulp.dest('./test/result/'))
            .pipe(gulpFunction(done,'atEnd'))
    })

    it('should run through smoothly once with ' + "'atFirst'",function(done){

        gulp.src('./test/*.md')
            .pipe(gulpFunction([myFunction2,myFunction3],'forFirst'))
            .pipe(gulp.dest('./test/result/'))
            .pipe(gulpFunction(done,'atEnd'))
    })

    it('should run in order',function(done){
        this.timeout(5000)
        let stream = gulp.src('./test/*.md')
            .pipe(gulpFunction([beforeFunction,middleFunction,middleFunction],'atEnd'))
            .pipe(gulpFunction(function(){
                beautylog.log('stream progressed')
                let done2 = Q.defer()
                done2.resolve()
                return done2.promise
            },'forEach'))
            .pipe(gulpFunction(function(){
                beautylog.log('nextStep')
            }))
            .pipe(gulpFunction(afterFunction,'atEnd'))
            .pipe(gulpFunction(timeoutFunction,'atEnd'))

        stream.on('finish',function(){
            beautylog.info('stream finished')
            done()
        })
    })
})

