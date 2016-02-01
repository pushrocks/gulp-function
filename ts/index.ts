/// <reference path="typings/main.d.ts" />
var through = require("through2");
var path = require("path");
var beautylog = require("beautylog");


module.exports = function (functionsToExecuteArg:any|any[],executionModeArg:string = 'forEach', logBoolArg = false) {
    //important vars
    var gulpFunction = {
        executionMode: executionModeArg, //can be forEach or atEnd
        functionsToExecute: functionsToExecuteArg,
        logBool: logBoolArg
    };

    var runFunctionNames = function () {
        if (typeof gulpFunction.functionsToExecute == "function" ) {
            gulpFunction.functionsToExecute();
        } else if (Array.isArray(gulpFunction.functionsToExecute)) {
            for (var anyFunction in gulpFunction.functionsToExecute) {
                anyFunction();
            }
        } else {
            beautylog.error('gulp-callfunction: something is strange with the given arguments');
        }
    };


    var forEach = function (file, enc, cb) {
        if (gulpFunction.logBool) beautylog.log(gulpFunction.executionMode);
        if (gulpFunction.executionMode === 'forEach') {
            if(gulpFunction.logBool) beautylog.log('is forEach');
            runFunctionNames();
        }
        //tell gulp that we are complete
        return cb(null, file);
    };

    var atEnd = function(cb) {
        if (gulpFunction.executionMode == "atEnd") {
            runFunctionNames();
        }
        cb();
    };
    return through.obj(forEach,atEnd);
};
