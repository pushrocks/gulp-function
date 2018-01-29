"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const through2 = require("through2");
let defaultExport = (functionsToExecuteArg, executionModeArg = "forEach") => {
    let promiseArray = [];
    let runFunction = function (functionArg, file, enc) {
        let returnValue = functionArg(file, enc);
        if (typeof returnValue !== "undefined" &&
            typeof returnValue.then !== "undefined") {
            promiseArray.push(returnValue);
        }
    };
    let checkAndRunFunction = function (file, enc) {
        if (typeof functionsToExecuteArg === "function") {
            runFunction(functionsToExecuteArg, file, enc);
        }
        else if (Array.isArray(functionsToExecuteArg)) {
            for (let anyFunction in functionsToExecuteArg) {
                runFunction(functionsToExecuteArg[anyFunction], file, enc);
            }
        }
        else {
            throw new Error("gulp-callfunction: something is strange with the given arguments");
        }
        return Promise.all(promiseArray);
    };
    let hasExecutedOnce = false;
    let forEach = function (file, enc, cb) {
        // the forEach function is called for every chunk
        switch (executionModeArg) {
            case "forEach":
                checkAndRunFunction(file, enc).then(function () {
                    cb(null, file);
                });
                break;
            case "forFirst":
                if (hasExecutedOnce) {
                    checkAndRunFunction(file, enc).then(function () {
                        cb(null, file);
                    });
                }
                else {
                    cb(null, file);
                }
                hasExecutedOnce = true;
                break;
            case "atEnd":
                cb();
                break;
            default:
                break;
        }
    };
    let atEnd = function (cb) {
        if (executionModeArg === "atEnd") {
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
    return defaultExport(funcArg, "forEach");
};
exports.forFirst = (funcArg) => {
    return defaultExport(funcArg, "forFirst");
};
exports.atEnd = (funcArg) => {
    return defaultExport(funcArg, "atEnd");
};
exports.default = defaultExport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHFDQUFxQztBQVNyQyxJQUFJLGFBQWEsR0FBRyxDQUNsQixxQkFBNEQsRUFDNUQsbUJBQW1DLFNBQVMsRUFDakMsRUFBRTtJQUNiLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUN0QixJQUFJLFdBQVcsR0FBRyxVQUFTLFdBQVcsRUFBRSxJQUFJLEVBQUUsR0FBRztRQUMvQyxJQUFJLFdBQVcsR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLEVBQUUsQ0FBQyxDQUNELE9BQU8sV0FBVyxLQUFLLFdBQVc7WUFDbEMsT0FBTyxXQUFXLENBQUMsSUFBSSxLQUFLLFdBQzlCLENBQUMsQ0FBQyxDQUFDO1lBQ0QsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsSUFBSSxtQkFBbUIsR0FBRyxVQUFTLElBQUksRUFBRSxHQUFHO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8scUJBQXFCLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNoRCxXQUFXLENBQUMscUJBQXFCLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRCxHQUFHLENBQUMsQ0FBQyxJQUFJLFdBQVcsSUFBSSxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDN0QsQ0FBQztRQUNILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sSUFBSSxLQUFLLENBQ2Isa0VBQWtFLENBQ25FLENBQUM7UUFDSixDQUFDO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBRUYsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQzVCLElBQUksT0FBTyxHQUFHLFVBQVMsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ2xDLGlEQUFpRDtRQUNqRCxNQUFNLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDekIsS0FBSyxTQUFTO2dCQUNaLG1CQUFtQixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ2xDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2pCLENBQUMsQ0FBQyxDQUFDO2dCQUNILEtBQUssQ0FBQztZQUNSLEtBQUssVUFBVTtnQkFDYixFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO29CQUNwQixtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUNsQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNqQixDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2pCLENBQUM7Z0JBQ0QsZUFBZSxHQUFHLElBQUksQ0FBQztnQkFDdkIsS0FBSyxDQUFDO1lBQ1IsS0FBSyxPQUFPO2dCQUNWLEVBQUUsRUFBRSxDQUFDO2dCQUNMLEtBQUssQ0FBQztZQUNSO2dCQUNFLEtBQUssQ0FBQztRQUNWLENBQUM7SUFDSCxDQUFDLENBQUM7SUFFRixJQUFJLEtBQUssR0FBRyxVQUFTLEVBQUU7UUFDckIsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNqQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNuQyxFQUFFLEVBQUUsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sRUFBRSxFQUFFLENBQUM7UUFDUCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBQ0YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3RDLENBQUMsQ0FBQztBQUVTLFFBQUEsT0FBTyxHQUFHLENBQUMsT0FBeUIsRUFBRSxFQUFFO0lBQ2pELE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzNDLENBQUMsQ0FBQztBQUVTLFFBQUEsUUFBUSxHQUFHLENBQUMsT0FBeUIsRUFBRSxFQUFFO0lBQ2xELE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzVDLENBQUMsQ0FBQztBQUVTLFFBQUEsS0FBSyxHQUFHLENBQUMsT0FBeUIsRUFBRSxFQUFFO0lBQy9DLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pDLENBQUMsQ0FBQztBQUVGLGtCQUFlLGFBQWEsQ0FBQyJ9