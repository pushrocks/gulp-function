/// <reference path="typings/tsd.d.ts" />
var through = require("through2");
var path = require("path");
var beautylog = require("beautylog");
//important vars
var gulpCallFunction = {
    executionMode: 'forEach',
    functionsToExecute: undefined,
    logBool: false
};
var runFunctionNames = function () {
    if (typeof gulpCallFunction.functionsToExecute == "function") {
        gulpCallFunction.functionsToExecute();
    }
    else if (Array.isArray(gulpCallFunction.functionsToExecute)) {
        for (var anyFunction in gulpCallFunction.functionsToExecute) {
            anyFunction();
        }
    }
    else {
        beautylog.error('gulp-callfunction: something is strange with the given arguments');
    }
};
var forEach = function (file, enc, cb) {
    if (gulpCallFunction.logBool)
        beautylog.log(gulpCallFunction.executionMode);
    if (gulpCallFunction.executionMode === 'forEach') {
        if (gulpCallFunction.logBool)
            beautylog.log('is forEach');
        runFunctionNames();
    }
    //tell gulp that we are complete
    return cb(null, file);
};
var atEnd = function () {
    if (gulpCallFunction.executionMode == "atEnd") {
        runFunctionNames();
    }
};
module.exports = function (functionsToExecute, executionMode, logBool) {
    if (executionMode === void 0) { executionMode = 'forEach'; }
    if (logBool === void 0) { logBool = false; }
    gulpCallFunction.functionsToExecute = functionsToExecute;
    gulpCallFunction.executionMode = executionMode;
    gulpCallFunction.logBool = logBool;
    return through.obj(forEach, atEnd);
};
