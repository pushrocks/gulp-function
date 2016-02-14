/// <reference path="typings/main.d.ts" />

var plugins = {
    beautylog: require("beautylog"),
    Q: require("q"),
    through: require("through2")
}




module.exports = function (functionsToExecuteArg:any|any[],executionModeArg:string = 'forEach') {
    //important vars
    var executionMode = executionModeArg; //can be forEach or atEnd
    var functionsToExecute = functionsToExecuteArg;
    var promiseArray = [];
    var runFunction = function(functionArg){
        var returnValue = functionArg();
        if (typeof returnValue !== "undefined" && typeof returnValue.then !== "undefined") {
            promiseArray.push(returnValue);
        }
    };

    var checkAndRunFunction = function () {
        if (typeof functionsToExecute === "function" ) {
            runFunction(functionsToExecute);
        } else if (Array.isArray(functionsToExecute)) {
            for (var anyFunction in functionsToExecute) {
                runFunction(functionsToExecute[anyFunction]);
            }
        } else {
            plugins.beautylog.error('gulp-callfunction: something is strange with the given arguments');
        }
        return plugins.Q.all(promiseArray);
    };


    var forEach = function (file, enc, cb) {
        if (executionMode === 'forEach') {
            checkAndRunFunction().then(function(){
                cb(null, file);
            });
        } else {
            cb(null, file);
        }
        //tell gulp that we are complete

    };

    var atEnd = function(cb) {
        if (executionMode === "atEnd") {
            checkAndRunFunction().then(function(){
                cb();
            });
        } else {
            cb();
        }
    };
    return plugins.through.obj(forEach,atEnd);
};
