"use strict";
require("typings-global");
const q = require("q");
const through2 = require("through2");
let defaultExport = (functionsToExecuteArg, executionModeArg = 'forEach') => {
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
exports.forEach = (funcArg) => {
    return defaultExport(funcArg, 'forEach');
};
exports.forFirst = (funcArg) => {
    return defaultExport(funcArg, 'forFirst');
};
exports.atEnd = (funcArg) => {
    return defaultExport(funcArg, 'atEnd');
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = defaultExport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQXVCO0FBQ3ZCLHVCQUFzQjtBQUN0QixxQ0FBb0M7QUFTcEMsSUFBSSxhQUFhLEdBQUcsQ0FDaEIscUJBQTRELEVBQzVELG1CQUFtQyxTQUFTO0lBRzVDLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQTtJQUNyQixJQUFJLFdBQVcsR0FBRyxVQUFVLFdBQVcsRUFBRSxJQUFJLEVBQUUsR0FBRztRQUM5QyxJQUFJLFdBQVcsR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sV0FBVyxLQUFLLFdBQVcsSUFBSSxPQUFPLFdBQVcsQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNoRixZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ2xDLENBQUM7SUFDTCxDQUFDLENBQUE7SUFFRCxJQUFJLG1CQUFtQixHQUFHLFVBQVUsSUFBSSxFQUFFLEdBQUc7UUFDekMsRUFBRSxDQUFDLENBQUMsT0FBTyxxQkFBcUIsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzlDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDakQsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLEdBQUcsQ0FBQyxDQUFDLElBQUksV0FBVyxJQUFJLHFCQUFxQixDQUFDLENBQUMsQ0FBQztnQkFDNUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUM5RCxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxJQUFJLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFBO1FBQ3ZGLENBQUM7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUM5QixDQUFDLENBQUE7SUFFRCxJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUE7SUFDM0IsSUFBSSxPQUFPLEdBQUcsVUFBVSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDakMsTUFBTSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEtBQUssU0FBUztnQkFDVixtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNoQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUNsQixDQUFDLENBQUMsQ0FBQTtnQkFDRixLQUFLLENBQUE7WUFDVCxLQUFLLFVBQVU7Z0JBQ1gsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztvQkFDbEIsbUJBQW1CLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQzt5QkFDekIsSUFBSSxDQUFDO3dCQUNGLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7b0JBQ2xCLENBQUMsQ0FBQyxDQUFBO2dCQUNWLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtnQkFDbEIsQ0FBQztnQkFDRCxlQUFlLEdBQUcsSUFBSSxDQUFBO2dCQUN0QixLQUFLLENBQUE7WUFDVCxLQUFLLE9BQU87Z0JBQ1IsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtnQkFDZCxLQUFLLENBQUE7WUFDVDtnQkFDSSxLQUFLLENBQUE7UUFDYixDQUFDO0lBQ0wsQ0FBQyxDQUFBO0lBRUQsSUFBSSxLQUFLLEdBQUcsVUFBVSxFQUFFO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDL0IsbUJBQW1CLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDakMsRUFBRSxFQUFFLENBQUE7WUFDUixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLEVBQUUsRUFBRSxDQUFBO1FBQ1IsQ0FBQztJQUNMLENBQUMsQ0FBQTtJQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTtBQUN2QyxDQUFDLENBQUE7QUFFVSxRQUFBLE9BQU8sR0FBRyxDQUFDLE9BQXlCO0lBQzNDLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0FBQzVDLENBQUMsQ0FBQTtBQUVVLFFBQUEsUUFBUSxHQUFHLENBQUMsT0FBeUI7SUFDNUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFDN0MsQ0FBQyxDQUFBO0FBRVUsUUFBQSxLQUFLLEdBQUcsQ0FBQyxPQUF5QjtJQUN6QyxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUMxQyxDQUFDLENBQUE7O0FBRUQsa0JBQWUsYUFBYSxDQUFBIn0=