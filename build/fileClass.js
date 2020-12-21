"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoilerFile = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var methods_1 = __importDefault(require("./methods"));
var BoilerFile = /** @class */ (function () {
    function BoilerFile(options, content) {
        this.name = options.name;
        this.extension = options.extension;
        this.content = content;
        this.path = path_1.default.resolve(options.path);
    }
    BoilerFile.prototype.write = function () {
        var folders = methods_1.default.getAllDirectories(this.path);
        var currentPath = '';
        folders.forEach(function (folder) {
            if (!currentPath) {
                currentPath += folder;
                return;
            }
            currentPath += "/" + folder;
            if (!fs_1.default.existsSync(currentPath)) {
                fs_1.default.mkdirSync("" + currentPath);
            }
        });
        fs_1.default.writeFileSync(this.path + "/" + this.name + "." + this.extension, this.content);
    };
    BoilerFile.prototype.update = function (content) {
        this.content = content;
        return this;
    };
    return BoilerFile;
}());
exports.BoilerFile = BoilerFile;
