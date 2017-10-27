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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBCQUF1QjtBQUV2QixxQ0FBb0M7QUFTcEMsSUFBSSxhQUFhLEdBQUcsQ0FDbEIscUJBQTRELEVBQzVELG1CQUFtQyxTQUFTLEVBQ2pDLEVBQUU7SUFFYixJQUFJLFlBQVksR0FBRyxFQUFFLENBQUE7SUFDckIsSUFBSSxXQUFXLEdBQUcsVUFBVSxXQUFXLEVBQUUsSUFBSSxFQUFFLEdBQUc7UUFDaEQsSUFBSSxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUN4QyxFQUFFLENBQUMsQ0FBQyxPQUFPLFdBQVcsS0FBSyxXQUFXLElBQUksT0FBTyxXQUFXLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbEYsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNoQyxDQUFDO0lBQ0gsQ0FBQyxDQUFBO0lBRUQsSUFBSSxtQkFBbUIsR0FBRyxVQUFVLElBQUksRUFBRSxHQUFHO1FBQzNDLEVBQUUsQ0FBQyxDQUFDLE9BQU8scUJBQXFCLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNoRCxXQUFXLENBQUMscUJBQXFCLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQy9DLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRCxHQUFHLENBQUMsQ0FBQyxJQUFJLFdBQVcsSUFBSSxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBRSxXQUFXLENBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDOUQsQ0FBQztRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsa0VBQWtFLENBQUMsQ0FBQTtRQUNyRixDQUFDO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDbEMsQ0FBQyxDQUFBO0lBRUQsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFBO0lBQzNCLElBQUksT0FBTyxHQUFHLFVBQVUsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ25DLE1BQU0sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUN6QixLQUFLLFNBQVM7Z0JBQ1osbUJBQW1CLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDbEMsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtnQkFDaEIsQ0FBQyxDQUFDLENBQUE7Z0JBQ0YsS0FBSyxDQUFBO1lBQ1AsS0FBSyxVQUFVO2dCQUNiLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLG1CQUFtQixDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7eUJBQzNCLElBQUksQ0FBQzt3QkFDSixFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO29CQUNoQixDQUFDLENBQUMsQ0FBQTtnQkFDTixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7Z0JBQ2hCLENBQUM7Z0JBQ0QsZUFBZSxHQUFHLElBQUksQ0FBQTtnQkFDdEIsS0FBSyxDQUFBO1lBQ1AsS0FBSyxPQUFPO2dCQUNWLEVBQUUsRUFBRSxDQUFBO2dCQUNKLEtBQUssQ0FBQTtZQUNQO2dCQUNFLEtBQUssQ0FBQTtRQUNULENBQUM7SUFDSCxDQUFDLENBQUE7SUFFRCxJQUFJLEtBQUssR0FBRyxVQUFVLEVBQUU7UUFDdEIsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNqQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNuQyxFQUFFLEVBQUUsQ0FBQTtZQUNOLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sRUFBRSxFQUFFLENBQUE7UUFDTixDQUFDO0lBQ0gsQ0FBQyxDQUFBO0lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQ3JDLENBQUMsQ0FBQTtBQUVVLFFBQUEsT0FBTyxHQUFHLENBQUMsT0FBeUIsRUFBRSxFQUFFO0lBQ2pELE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0FBQzFDLENBQUMsQ0FBQTtBQUVVLFFBQUEsUUFBUSxHQUFHLENBQUMsT0FBeUIsRUFBRSxFQUFFO0lBQ2xELE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQzNDLENBQUMsQ0FBQTtBQUVVLFFBQUEsS0FBSyxHQUFHLENBQUMsT0FBeUIsRUFBRSxFQUFFO0lBQy9DLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQ3hDLENBQUMsQ0FBQTtBQUVELGtCQUFlLGFBQWEsQ0FBQSJ9