/// <reference path="typings/tsd.d.ts" />
var through = require("through2");
var path = require("path");
var beautylog = require("beautylog");

//important vars
var executionMode:string; //can be forEach or atEnd
var functionsToExecute;
var runFunctionNames = function () {
    if (typeof functionsToExecute === "function" ) {
        functionsToExecute();
    } else if (Array.isArray(functionsToExecute)) {
        for (var anyFunction in functionsToExecute) {
            anyFunction();
        }
    } else {
        beautylog.error('gulp-callfunction: something is strange with the given arguments');
    }
};


var forEach = function (file, enc, cb) {
        if (executionMode === 'forEach') {
            runFunctionNames();
        }
        //tell gulp that we are complete
        return cb(null, file);
};

var atEnd = function() {
        if (executionMode === "atEnd") {
            runFunctionNames();
        }
};
module.exports = function (functionsToExecute:any|any[],executionMode:string = 'forEach') {
    this.functionsToExecute = functionsToExecute;
    this.executionMode = executionMode;
    return through.obj(forEach,atEnd);
};
