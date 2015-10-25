/// <reference path="typings/tsd.d.ts" />
var path, through;
through = require("through2");
path = require("path");
module.exports = function (jsonObject, type) {
    if (type === void 0) { type = undefined; }
    return through.obj(function (file, enc, cb) {
        //tell gulp that we are complete
        return cb(null, file);
    });
};
