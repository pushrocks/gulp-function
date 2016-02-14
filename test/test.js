#!/usr/bin/env node

/// <reference path="typings/main.d.ts" />
var gulp = require("gulp");
var gulpFunction = require("../index.js");
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
});
