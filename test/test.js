"use strict";
require("typings-test");
let gulp = require('gulp');
const index_1 = require("../dist/index");
const beautylog = require("beautylog");
let Q = require('q');
let myFunction = function () {
    let done = Q.defer();
    beautylog.log('Function executed');
    done.resolve();
    return done.promise;
};
let myFunction2 = function () {
    let done = Q.defer();
    beautylog.ok('Function2 executed');
    done.resolve();
    return done.promise;
};
let myFunction3 = function () {
    let done = Q.defer();
    beautylog.success('Function3 executed');
    done.resolve();
    return done.promise;
};
let beforeFunction = function () {
    let done = Q.defer();
    beautylog.success('beforeFunction executed');
    done.resolve();
    return done.promise;
};
let middleFunctionRun = false;
let middleFunction = function () {
    let done = Q.defer();
    beautylog.success('middleFunction executed');
    setTimeout(function () {
        beautylog.log('timeout fired');
        middleFunctionRun = true;
        done.resolve();
    }, 500);
    return done.promise;
};
let afterFunction = function () {
    let done = Q.defer();
    beautylog.success('afterFunction executed');
    done.resolve();
    return done.promise;
};
let timeoutFunction = function () {
    let done = Q.defer();
    setTimeout(function () {
        beautylog.log('largeTimeout fired');
        done.resolve();
    }, 2000);
    return done.promise;
};
describe('gulpFunction', function () {
    it('should run through smoothly with ' + "'forEach'", function (done) {
        gulp.src('./test/*.md')
            .pipe(index_1.default(myFunction, 'forEach'))
            .pipe(gulp.dest('./test/result/'));
        gulp.src('./test/*.md')
            .pipe(index_1.default([myFunction2, myFunction3], 'forEach'))
            .pipe(gulp.dest('./test/result/'))
            .pipe(index_1.default(done, 'atEnd'));
    });
    it('should run through smoothly with ' + "'atEnd'", function (done) {
        gulp.src('./test/*.md')
            .pipe(index_1.default(myFunction, 'atEnd'))
            .pipe(gulp.dest('./test/result/'));
        gulp.src('./test/*.md')
            .pipe(index_1.default([myFunction2, myFunction3], 'atEnd'))
            .pipe(gulp.dest('./test/result/'))
            .pipe(index_1.default(done, 'atEnd'));
    });
    it('should run through smoothly once with ' + "'atFirst'", function (done) {
        gulp.src('./test/*.md')
            .pipe(index_1.default([myFunction2, myFunction3], 'forFirst'))
            .pipe(gulp.dest('./test/result/'))
            .pipe(index_1.default(done, 'atEnd'));
    });
    it('should run in order', function (done) {
        this.timeout(5000);
        let stream = gulp.src('./test/*.md')
            .pipe(index_1.default([beforeFunction, middleFunction, middleFunction], 'atEnd'))
            .pipe(index_1.default(function () {
            beautylog.log('stream progressed');
            let done2 = Q.defer();
            done2.resolve();
            return done2.promise;
        }, 'forEach'))
            .pipe(index_1.default(function () {
            beautylog.log('nextStep');
        }))
            .pipe(index_1.default(afterFunction, 'atEnd'))
            .pipe(index_1.default(timeoutFunction, 'atEnd'));
        stream.on('finish', function () {
            beautylog.info('stream finished');
            done();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUNyQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDMUIseUNBQXdDO0FBRXhDLHVDQUFzQztBQUN0QyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7QUFFcEIsSUFBSSxVQUFVLEdBQUc7SUFDYixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDcEIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0lBQ2xDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQTtBQUNELElBQUksV0FBVyxHQUFHO0lBQ2QsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ3BCLFNBQVMsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtJQUNsQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUN2QixDQUFDLENBQUE7QUFDRCxJQUFJLFdBQVcsR0FBRztJQUNkLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNwQixTQUFTLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUE7SUFDdkMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDdkIsQ0FBQyxDQUFBO0FBRUQsSUFBSSxjQUFjLEdBQUc7SUFDakIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ3BCLFNBQVMsQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FB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