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
var createPackageJson = function (name, dependencies) {
    var baseFile = {
        name: name,
        version: "1.0.0",
        description: "",
        main: "index.js",
        scripts: {
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        author: "",
        license: "ISC",
        dependencies: {}
    };
    dependencies.forEach(function (dependency) {
        baseFile.dependencies[dependency.name] = dependency.version;
    });
    return JSON.stringify(baseFile);
};
var createDependenciesObject = function (arr) {
    var output = {};
    arr.forEach(function (item) { return output[item.name] = item.version; });
    return output;
};
exports.default = {
    getAllDirectories: getAllDirectories,
    createPackageJson: createPackageJson,
    createDependenciesObject: createDependenciesObject,
};
