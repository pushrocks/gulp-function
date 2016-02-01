/// <reference path="typings/main.d.ts" />
var gulp = require("gulp");
var gulpFunction = require("../index.js");
var beautylog = require("beautylog");
var myFunction = function () {
    beautylog.log("Mocha Test successfull!");
};
describe("gulpFunction", function () {
    it("should run through smoothly", function () {
        gulp.task('default', function () {
            gulp.src('./test/test.md')
                .pipe(gulpFunction(myFunction, 'forEach'))
                .pipe(gulp.dest("./test/result/"));
        });
        gulp.start.apply(gulp, ['default']);
    });
});
