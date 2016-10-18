"use strict";
require("typings-global");
const q = require("q");
const through2 = require("through2");
let mainExportFunction = (functionsToExecuteArg, executionModeArg = 'forEach') => {
    let promiseArray = [];
    let runFunction = function (functionArg, file, enc) {
        let returnValue = functionArg(file, enc);
        if (typeof returnValue !== 'undefined' && typeof returnValue.then !== 'undefined') {
            promiseArray.push(returnValue);
        }
    };
    let checkAndRunFunction = function (file, enc) {
        if (typeof functionsToExecuteArg === 'function') {
            runFunction(functionsToExecuteArg, file, enc);
        }
        else if (Array.isArray(functionsToExecuteArg)) {
            for (let anyFunction in functionsToExecuteArg) {
                runFunction(functionsToExecuteArg[anyFunction], file, enc);
            }
        }
        else {
            throw new Error('gulp-callfunction: something is strange with the given arguments');
        }
        return q.all(promiseArray);
    };
    let hasExecutedOnce = false;
    let forEach = function (file, enc, cb) {
        switch (executionModeArg) {
            case 'forEach':
                checkAndRunFunction(file, enc).then(function () {
                    cb(null, file);
                });
                break;
            case 'forFirst':
                if (hasExecutedOnce) {
                    checkAndRunFunction(file, enc)
                        .then(function () {
                        cb(null, file);
                    });
                }
                else {
                    cb(null, file);
                }
                hasExecutedOnce = true;
                break;
            case 'atEnd':
                cb(null, file);
                break;
            default:
                break;
        }
    };
    let atEnd = function (cb) {
        if (executionModeArg === 'atEnd') {
            checkAndRunFunction(null, null).then(function () {
                cb();
            });
        }
        else {
            cb();
        }
    };
    return through2.obj(forEach, atEnd);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mainExportFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQXVCO0FBQ3ZCLHVCQUFzQjtBQUN0QixxQ0FBb0M7QUFTcEMsSUFBSSxrQkFBa0IsR0FBRyxDQUNyQixxQkFBNEQsRUFDNUQsZ0JBQWdCLEdBQW1CLFNBQVM7SUFHNUMsSUFBSSxZQUFZLEdBQUcsRUFBRSxDQUFBO0lBQ3JCLElBQUksV0FBVyxHQUFHLFVBQVUsV0FBVyxFQUFFLElBQUksRUFBRSxHQUFHO1FBQzlDLElBQUksV0FBVyxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDeEMsRUFBRSxDQUFDLENBQUMsT0FBTyxXQUFXLEtBQUssV0FBVyxJQUFJLE9BQU8sV0FBVyxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2hGLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDbEMsQ0FBQztJQUNMLENBQUMsQ0FBQTtJQUVELElBQUksbUJBQW1CLEdBQUcsVUFBVSxJQUFJLEVBQUUsR0FBRztRQUN6QyxFQUFFLENBQUMsQ0FBQyxPQUFPLHFCQUFxQixLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDOUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNqRCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUMsR0FBRyxDQUFDLENBQUMsSUFBSSxXQUFXLElBQUkscUJBQXFCLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxXQUFXLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1lBQzlELENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLGtFQUFrRSxDQUFDLENBQUE7UUFDdkYsQ0FBQztRQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQzlCLENBQUMsQ0FBQTtJQUVELElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQTtJQUMzQixJQUFJLE9BQU8sR0FBRyxVQUFVLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNqQyxNQUFNLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDdkIsS0FBSyxTQUFTO2dCQUNWLG1CQUFtQixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ2hDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7Z0JBQ2xCLENBQUMsQ0FBQyxDQUFBO2dCQUNGLEtBQUssQ0FBQTtZQUNULEtBQUssVUFBVTtnQkFDWCxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO29CQUNsQixtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO3lCQUN6QixJQUFJLENBQUM7d0JBQ0YsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtvQkFDbEIsQ0FBQyxDQUFDLENBQUE7Z0JBQ1YsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUNsQixDQUFDO2dCQUNELGVBQWUsR0FBRyxJQUFJLENBQUE7Z0JBQ3RCLEtBQUssQ0FBQTtZQUNULEtBQUssT0FBTztnQkFDUixFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUNkLEtBQUssQ0FBQTtZQUNUO2dCQUNJLEtBQUssQ0FBQTtRQUNiLENBQUM7SUFDTCxDQUFDLENBQUE7SUFFRCxJQUFJLEtBQUssR0FBRyxVQUFVLEVBQUU7UUFDcEIsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMvQixtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNqQyxFQUFFLEVBQUUsQ0FBQTtZQUNSLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osRUFBRSxFQUFFLENBQUE7UUFDUixDQUFDO0lBQ0wsQ0FBQyxDQUFBO0lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQ3ZDLENBQUMsQ0FBQTs7QUFFRCxrQkFBZSxrQkFBa0IsQ0FBQSJ9