"use strict";
require("typings-test");
let gulp = require('gulp');
const index_1 = require("../dist/index");
let beautylog = require('beautylog');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUNyQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IseUNBQXdDO0FBQ3hDLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUNwQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7QUFFcEIsSUFBSSxVQUFVLEdBQUc7SUFDYixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDcEIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ25DLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQztBQUNGLElBQUksV0FBVyxHQUFHO0lBQ2QsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JCLFNBQVMsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNuQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUM7QUFDRixJQUFJLFdBQVcsR0FBRztJQUNkLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQixTQUFTLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDeEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFDO0FBRUYsSUFBSSxjQUFjLEdBQUc7SUFDakIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JCLFNBQVMsQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUM3QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUM7QUFFRixJQUFJLGlCQUFpQixHQUFHLEtBQUssQ0FBQztBQUU5QixJQUFJLGNBQWMsR0FBRztJQUNqQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckIsU0FBUyxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQzdDLFVBQVUsQ0FBQztRQUNQLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0IsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUM7QUFFRixJQUFJLGFBQWEsR0FBRztJQUNoQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckIsU0FBUyxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQzVDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQztBQUVGLElBQUksZUFBZSxHQUFHO0lBQ2xCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQixVQUFVLENBQUM7UUFDUCxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQztBQUlGLFFBQVEsQ0FBQyxjQUFjLEVBQUM7SUFDcEIsRUFBRSxDQUFDLG1DQUFtQyxHQUFHLFdBQVcsRUFBQyxVQUFTLElBQUk7UUFDOUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7YUFDbEIsSUFBSSxDQUFDLGVBQVksQ0FBQyxVQUFVLEVBQUMsU0FBUyxDQUFDLENBQUM7YUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO2FBQ2xCLElBQUksQ0FBQyxlQUFZLENBQUMsQ0FBQyxXQUFXLEVBQUMsV0FBVyxDQUFDLEVBQUMsU0FBUyxDQUFDLENBQUM7YUFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUNqQyxJQUFJLENBQUMsZUFBWSxDQUFDLElBQUksRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBRTFDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG1DQUFtQyxHQUFHLFNBQVMsRUFBQyxVQUFTLElBQUk7UUFDNUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7YUFDbEIsSUFBSSxDQUFDLGVBQVksQ0FBQyxVQUFVLEVBQUMsT0FBTyxDQUFDLENBQUM7YUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO2FBQ2xCLElBQUksQ0FBQyxlQUFZLENBQUMsQ0FBQyxXQUFXLEVBQUMsV0FBVyxDQUFDLEVBQUMsT0FBTyxDQUFDLENBQUM7YUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUNqQyxJQUFJLENBQUMsZUFBWSxDQUFDLElBQUksRUFBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHdDQUF3QyxHQUFHLFdBQVcsRUFBQyxVQUFTLElBQUk7UUFFbkUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7YUFDbEIsSUFBSSxDQUFDLGVBQVksQ0FBQyxDQUFDLFdBQVcsRUFBQyxXQUFXLENBQUMsRUFBQyxVQUFVLENBQUMsQ0FBQzthQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ2pDLElBQUksQ0FBQyxlQUFZLENBQUMsSUFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMscUJBQXFCLEVBQUMsVUFBUyxJQUFJO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7YUFDL0IsSUFBSSxDQUFDLGVBQVksQ0FBQyxDQUFDLGNBQWMsRUFBQyxjQUFjLEVBQUMsY0FBYyxDQUFDLEVBQUMsT0FBTyxDQUFDLENBQUM7YUFDMUUsSUFBSSxDQUFDLGVBQVksQ0FBQztZQUNmLFNBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNuQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEIsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ3pCLENBQUMsRUFBQyxTQUFTLENBQUMsQ0FBQzthQUNaLElBQUksQ0FBQyxlQUFZLENBQUM7WUFDZixTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO2FBQ0YsSUFBSSxDQUFDLGVBQVksQ0FBQyxhQUFhLEVBQUMsT0FBTyxDQUFDLENBQUM7YUFDekMsSUFBSSxDQUFDLGVBQVksQ0FBQyxlQUFlLEVBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUVqRCxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBQztZQUNmLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNsQyxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9