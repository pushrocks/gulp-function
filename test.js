/// <reference path="typings/tsd.d.ts" />
var gulp = require("gulp");
var gulpCallFunction = require("./index.js");
var myFunction = function () {
    console.log("Hello World!");
};
gulp.task('default', function () {
    gulp.src('./test/test.md')
        .pipe(gulpCallFunction(myFunction, 'forEach'))
        .pipe(gulp.dest("./test/result/"));
});
gulp.start.apply(gulp, ['default']);
