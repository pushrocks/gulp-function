/// <reference path="typings/tsd.d.ts" />
var path, through;

through = require("through2");
path = require("path");

module.exports = (jsonObject,type = undefined) => {
    

    return through.obj((file, enc, cb) => {
        //tell gulp that we are complete
        return cb(null, file);
    });
};
