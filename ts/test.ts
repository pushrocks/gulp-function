/// <reference path="typings/main.d.ts" />
var gulp = require("gulp");
var gulpFunction = require("../index.js");
var beautylog = require("beautylog");

var myFunction = function () {
    beautylog.log("Function executed");
};
var myFunction2 = function () {
    beautylog.log("Function2 executed");
};

describe("gulpFunction",function(){
    it("should run through smoothly with " + "'forEach'".blue,function(){
        gulp.src('./test/*.md')
            .pipe(gulpFunction(myFunction,'forEach'))
            .pipe(gulp.dest("./test/result/"));
        gulp.src('./test/*.md')
            .pipe(gulpFunction([myFunction,myFunction2],'forEach'))
            .pipe(gulp.dest("./test/result/"));

    });

    it("should run through smoothly with " + "'atEnd'".blue,function(){
        gulp.src('./test/*.md')
            .pipe(gulpFunction(myFunction,'atEnd'))
            .pipe(gulp.dest("./test/result/"));
        gulp.src('./test/*.md')
            .pipe(gulpFunction([myFunction,myFunction2],'atEnd'))
            .pipe(gulp.dest("./test/result/"));
    });
});

