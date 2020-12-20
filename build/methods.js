"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getAllDirectories = function (path) {
    var output = [];
    var currentFolder = '';
    var _loop_1 = function (index) {
        (function () {
            if (path[index] === '/' || path[index] === '\\') {
                output.push(currentFolder);
                currentFolder = '';
                return;
            }
            currentFolder += path[index];
            if (index === path.length - 1) {
                output.push(currentFolder);
            }
        })();
    };
    for (var index = 0; index < path.length; index++) {
        _loop_1(index);
    }
    return output;
};
exports.default = {
    getAllDirectories: getAllDirectories,
};
