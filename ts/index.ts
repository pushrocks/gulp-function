/// <reference path="typings/main.d.ts" />

import plugins = require("./gulpfunction.plugins");




module.exports = function (functionsToExecuteArg:any|any[],executionModeArg:string = 'forEach') {
    //important vars
    let executionMode = executionModeArg; //can be forEach or atEnd
    let functionsToExecute = functionsToExecuteArg;
    let promiseArray = [];
    let runFunction = function(functionArg){
        let returnValue = functionArg();
        if (typeof returnValue !== "undefined" && typeof returnValue.then !== "undefined") {
            promiseArray.push(returnValue);
        }
    };

    let checkAndRunFunction = function () {
        if (typeof functionsToExecute === "function" ) {
            runFunction(functionsToExecute);
        } else if (Array.isArray(functionsToExecute)) {
            for (let anyFunction in functionsToExecute) {
                runFunction(functionsToExecute[anyFunction]);
            }
        } else {
            throw new Error("gulp-callfunction: something is strange with the given arguments");
        }
        return plugins.Q.all(promiseArray);
    };

    let hasExecutedOnce = false;
    let forEach = function (file, enc, cb) { //the forEach function is called for every chunk
        switch (executionMode){
            case "forEach":
                checkAndRunFunction().then(function(){
                    cb(null, file);
                });
                break;
            case "forFirst":
                !hasExecutedOnce ? checkAndRunFunction().then(function(){
                    cb(null, file);
                }) : cb(null, file);
                hasExecutedOnce = true;
                break;
            case "atEnd":
                cb(null, file);
                break;
            default:
                break;
        }
    };

    let atEnd = function(cb) {
        if (executionMode === "atEnd") {
            checkAndRunFunction().then(function(){
                cb();
            });
        } else {
            cb();
        }
    };
    return plugins.through2.obj(forEach,atEnd);
};
