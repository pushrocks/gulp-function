#!/usr/bin/env node

/// <reference path="typings/main.d.ts" />
var through = require("through2");
var path = require("path");
var beautylog = require("beautylog");
module.exports = function (functionsToExecuteArg, executionModeArg) {
    if (executionModeArg === void 0) { executionModeArg = 'forEach'; }
    //important vars
    var gulpFunction = {
        executionMode: executionModeArg,
        functionsToExecute: functionsToExecuteArg
    };
    var runFunctionNames = function () {
        if (typeof gulpFunction.functionsToExecute === "function") {
            gulpFunction.functionsToExecute();
        }
        else if (Array.isArray(gulpFunction.functionsToExecute)) {
            for (var anyFunction in gulpFunction.functionsToExecute) {
                gulpFunction.functionsToExecute[anyFunction]();
            }
        }
        else {
            beautylog.error('gulp-callfunction: something is strange with the given arguments');
        }
    };
    var forEach = function (file, enc, cb) {
        if (gulpFunction.executionMode === 'forEach') {
            runFunctionNames();
        }
        //tell gulp that we are complete
        return cb(null, file);
    };
    var atEnd = function (cb) {
        if (gulpFunction.executionMode === "atEnd") {
            runFunctionNames();
        }
        cb();
    };
    return through.obj(forEach, atEnd);
};
