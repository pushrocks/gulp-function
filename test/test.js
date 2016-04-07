/// <reference path="../ts/typings/main.d.ts" />
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
var timeoutFunction = function () {
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
        var stream = gulp.src('./test/*.md')
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
//# sourceMappingURL=test.js.map