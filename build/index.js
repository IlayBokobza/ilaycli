#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fileClass_1 = require("./fileClass");
var chalk_1 = __importDefault(require("chalk"));
var files_1 = __importDefault(require("./files"));
var cli_1 = __importDefault(require("./cli"));
var methods_1 = __importDefault(require("./methods"));
var fs_1 = __importDefault(require("fs"));
var createNodeServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var dependencies;
    return __generator(this, function (_a) {
        //deletes server folder
        fs_1.default.rmdirSync(process.cwd() + "/server", { recursive: true });
        if (options.dbBoilerplate === 'users') {
            new fileClass_1.BoilerFile({ name: 'mongoose', extension: 'js', path: process.cwd() + "/server/db" }, files_1.default.nodeServer.mongo(options.projectName)).write();
            new fileClass_1.BoilerFile({ name: 'index', extension: 'js', path: process.cwd() + "/server" }, files_1.default.nodeServer.fullNodeIndex).write();
            new fileClass_1.BoilerFile({ name: 'user', extension: 'js', path: process.cwd() + "/server/models" }, files_1.default.nodeServer.userSchema).write();
            new fileClass_1.BoilerFile({ name: 'user', extension: 'js', path: process.cwd() + "/server/routes" }, files_1.default.nodeServer.userRoutes).write();
            new fileClass_1.BoilerFile({ name: 'auth', extension: 'js', path: process.cwd() + "/server/middleware" }, files_1.default.nodeServer.authMiddleware);
        }
        else if (options.dbBoilerplate === 'mongo') {
            new fileClass_1.BoilerFile({ name: 'moongose', extension: 'js', path: process.cwd() + "/server/db" }, files_1.default.nodeServer.mongo(options.projectName)).write();
            new fileClass_1.BoilerFile({ name: 'index', extension: 'js', path: process.cwd() + "/server" }, files_1.default.nodeServer.nodeIndexMongo).write();
        }
        else {
            new fileClass_1.BoilerFile({ name: 'index', extension: 'js', path: process.cwd() + "/server" }, files_1.default.nodeServer.normalNodeServer).write();
        }
        dependencies = [{ name: 'express', version: '^4.17.1' }];
        if (options.dbBoilerplate === 'users') {
            dependencies.push({ name: 'mongoose', version: '^5.11.8' }, { name: 'jsonwebtoken', version: '^8.5.1' }, { name: 'bcryptjs', version: '^2.4.3' }, { name: 'validator', version: '^13.4.2' });
        }
        else if (options.dbBoilerplate === 'mongo') {
            dependencies.push({ name: 'mongoose', version: '^5.11.8' });
        }
        if (options.usePackageJson) {
            new fileClass_1.BoilerFile({ name: 'package', extension: 'json', path: process.cwd() + "/server" }, methods_1.default.createPackageJson(options.projectName, dependencies)).write();
        }
        else {
            new fileClass_1.BoilerFile({ name: 'dependencies', extension: 'json', path: process.cwd() + "/server" }, JSON.stringify(methods_1.default.createDependenciesObject(dependencies))).write();
        }
        return [2 /*return*/];
    });
}); };
//boiler plate options
var options;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var selectedOptions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, cli_1.default()];
            case 1:
                selectedOptions = _a.sent();
                options = selectedOptions;
                switch (options.type) {
                    case 'node-server':
                        createNodeServer();
                        break;
                }
                console.log(chalk_1.default.greenBright('Boiler Plate Generated! ✌'));
                console.log(chalk_1.default.blue('cd server 🚄'));
                console.log(chalk_1.default.blue('npm install 🎯'));
                return [2 /*return*/];
        }
    });
}); })();
