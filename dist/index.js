"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("typings-global");
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
        return Promise.all(promiseArray);
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
                cb();
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
exports.default = defaultExport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBCQUF1QjtBQUV2QixxQ0FBb0M7QUFTcEMsSUFBSSxhQUFhLEdBQUcsQ0FDbEIscUJBQTRELEVBQzVELG1CQUFtQyxTQUFTO0lBRzVDLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQTtJQUNyQixJQUFJLFdBQVcsR0FBRyxVQUFVLFdBQVcsRUFBRSxJQUFJLEVBQUUsR0FBRztRQUNoRCxJQUFJLFdBQVcsR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sV0FBVyxLQUFLLFdBQVcsSUFBSSxPQUFPLFdBQVcsQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNsRixZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ2hDLENBQUM7SUFDSCxDQUFDLENBQUE7SUFFRCxJQUFJLG1CQUFtQixHQUFHLFVBQVUsSUFBSSxFQUFFLEdBQUc7UUFDM0MsRUFBRSxDQUFDLENBQUMsT0FBTyxxQkFBcUIsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2hELFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDL0MsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELEdBQUcsQ0FBQyxDQUFDLElBQUksV0FBVyxJQUFJLHFCQUFxQixDQUFDLENBQUMsQ0FBQztnQkFDOUMsV0FBVyxDQUFDLHFCQUFxQixDQUFFLFdBQVcsQ0FBRSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUM5RCxDQUFDO1FBQ0gsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFBO1FBQ3JGLENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNsQyxDQUFDLENBQUE7SUFFRCxJQUFJLGVBQWUsR0FBRyxLQUFLLENBQUE7SUFDM0IsSUFBSSxPQUFPLEdBQUcsVUFBVSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDbkMsTUFBTSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLEtBQUssU0FBUztnQkFDWixtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNsQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUNoQixDQUFDLENBQUMsQ0FBQTtnQkFDRixLQUFLLENBQUE7WUFDUCxLQUFLLFVBQVU7Z0JBQ2IsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztvQkFDcEIsbUJBQW1CLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQzt5QkFDM0IsSUFBSSxDQUFDO3dCQUNKLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7b0JBQ2hCLENBQUMsQ0FBQyxDQUFBO2dCQUNOLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtnQkFDaEIsQ0FBQztnQkFDRCxlQUFlLEdBQUcsSUFBSSxDQUFBO2dCQUN0QixLQUFLLENBQUE7WUFDUCxLQUFLLE9BQU87Z0JBQ1YsRUFBRSxFQUFFLENBQUE7Z0JBQ0osS0FBSyxDQUFBO1lBQ1A7Z0JBQ0UsS0FBSyxDQUFBO1FBQ1QsQ0FBQztJQUNILENBQUMsQ0FBQTtJQUVELElBQUksS0FBSyxHQUFHLFVBQVUsRUFBRTtRQUN0QixFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLG1CQUFtQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ25DLEVBQUUsRUFBRSxDQUFBO1lBQ04sQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixFQUFFLEVBQUUsQ0FBQTtRQUNOLENBQUM7SUFDSCxDQUFDLENBQUE7SUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDckMsQ0FBQyxDQUFBO0FBRVUsUUFBQSxPQUFPLEdBQUcsQ0FBQyxPQUF5QjtJQUM3QyxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQTtBQUMxQyxDQUFDLENBQUE7QUFFVSxRQUFBLFFBQVEsR0FBRyxDQUFDLE9BQXlCO0lBQzlDLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQzNDLENBQUMsQ0FBQTtBQUVVLFFBQUEsS0FBSyxHQUFHLENBQUMsT0FBeUI7SUFDM0MsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDeEMsQ0FBQyxDQUFBO0FBRUQsa0JBQWUsYUFBYSxDQUFBIn0=