/// <reference path="typings/tsd.d.ts" />
var through = require("through2");
var path = require("path");
var beautylog = require("beautylog")("os");


module.exports = function (functionsToExecuteArg:any|any[],executionModeArg:string = 'forEach', logBoolArg = false) {
    //important vars
    var gulpCallFunction = {
        executionMode: executionModeArg, //can be forEach or atEnd
        functionsToExecute: functionsToExecuteArg,
        logBool: logBoolArg
    };

    var runFunctionNames = function () {
        if (typeof gulpCallFunction.functionsToExecute == "function" ) {
            gulpCallFunction.functionsToExecute();
        } else if (Array.isArray(gulpCallFunction.functionsToExecute)) {
            for (var anyFunction in gulpCallFunction.functionsToExecute) {
                anyFunction();
            }
        } else {
            beautylog.error('gulp-callfunction: something is strange with the given arguments');
        }
    };


    var forEach = function (file, enc, cb) {
        if (gulpCallFunction.logBool) beautylog.log(gulpCallFunction.executionMode);
        if (gulpCallFunction.executionMode === 'forEach') {
            if(gulpCallFunction.logBool) beautylog.log('is forEach');
            runFunctionNames();
        }
        //tell gulp that we are complete
        return cb(null, file);
    };

    var atEnd = function(cb) {
        if (gulpCallFunction.executionMode == "atEnd") {
            runFunctionNames();
        }
        cb();
    };
    return through.obj(forEach,atEnd);
};
