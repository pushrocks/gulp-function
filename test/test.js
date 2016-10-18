"use strict";
require("typings-test");
var gulp = require("gulp");
var gulpFunction = require("../dist/index.js");
var beautylog = require("beautylog");
var Q = require("q");
var myFunction = function () {
    var done = Q.defer();
    beautylog.log("Function executed");
    done.resolve();
    return done.promise;
};
var myFunction2 = function () {
    var done = Q.defer();
    beautylog.ok("Function2 executed");
    done.resolve();
    return done.promise;
};
var myFunction3 = function () {
    var done = Q.defer();
    beautylog.success("Function3 executed");
    done.resolve();
    return done.promise;
};
var beforeFunction = function () {
    var done = Q.defer();
    beautylog.success("beforeFunction executed");
    done.resolve();
    return done.promise;
};
var middleFunctionRun = false;
var middleFunction = function () {
    var done = Q.defer();
    beautylog.success("middleFunction executed");
    setTimeout(function () {
        beautylog.log("timeout fired");
        middleFunctionRun = true;
        done.resolve();
    }, 500);
    return done.promise;
};
var afterFunction = function () {
    var done = Q.defer();
    beautylog.success("afterFunction executed");
    done.resolve();
    return done.promise;
};
let timeoutFunction = function () {
    var done = Q.defer();
    setTimeout(function () {
        beautylog.log("largeTimeout fired");
        done.resolve();
    }, 2000);
    return done.promise;
};
describe("gulpFunction", function () {
    it("should run through smoothly with " + "'forEach'".blue, function (done) {
        gulp.src('./test/*.md')
            .pipe(gulpFunction(myFunction, 'forEach'))
            .pipe(gulp.dest("./test/result/"));
        gulp.src('./test/*.md')
            .pipe(gulpFunction([myFunction2, myFunction3], 'forEach'))
            .pipe(gulp.dest("./test/result/"))
            .pipe(gulpFunction(done, "atEnd"));
    });
    it("should run through smoothly with " + "'atEnd'".blue, function (done) {
        gulp.src('./test/*.md')
            .pipe(gulpFunction(myFunction, 'atEnd'))
            .pipe(gulp.dest("./test/result/"));
        gulp.src('./test/*.md')
            .pipe(gulpFunction([myFunction2, myFunction3], 'atEnd'))
            .pipe(gulp.dest("./test/result/"))
            .pipe(gulpFunction(done, "atEnd"));
    });
    it("should run through smoothly once with " + "'atFirst'".blue, function (done) {
        gulp.src('./test/*.md')
            .pipe(gulpFunction([myFunction2, myFunction3], 'forFirst'))
            .pipe(gulp.dest("./test/result/"))
            .pipe(gulpFunction(done, "atEnd"));
    });
    it("should run in order", function (done) {
        this.timeout(5000);
        let stream = gulp.src('./test/*.md')
            .pipe(gulpFunction([beforeFunction, middleFunction, middleFunction], 'atEnd'))
            .pipe(gulpFunction(function () {
            beautylog.log("stream progressed");
            var done2 = Q.defer();
            done2.resolve();
            return done2.promise;
        }, "forEach"))
            .pipe(gulpFunction(function () {
            beautylog.log("nextStep");
        }))
            .pipe(gulpFunction(afterFunction, "atEnd"))
            .pipe(gulpFunction(timeoutFunction, "atEnd"));
        stream.on("finish", function () {
            beautylog.info("stream finished");
            done();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUNyQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDL0MsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUVyQixJQUFJLFVBQVUsR0FBRztJQUNiLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNwQixTQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDbkMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFDO0FBQ0YsSUFBSSxXQUFXLEdBQUc7SUFDZCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDckIsU0FBUyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ25DLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQztBQUNGLElBQUksV0FBVyxHQUFHO0lBQ2QsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JCLFNBQVMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUN4QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUM7QUFFRixJQUFJLGNBQWMsR0FBRztJQUNqQixJQUFJLElBQUksR0FB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