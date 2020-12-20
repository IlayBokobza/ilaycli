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
var prompts_1 = __importDefault(require("prompts"));
var chalk_1 = __importDefault(require("chalk"));
var files_1 = __importDefault(require("./files"));
var app_root_path_1 = __importDefault(require("app-root-path"));
//global vars
var projectName;
var useMongo = false;
var createPackageJsonG = false;
var createNodeServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var techUsed;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prompts_1.default({
                    type: 'multiselect',
                    name: 'value',
                    message: 'What Features Do You Want To Use?',
                    choices: [
                        { title: 'MongoDB', value: 'mongo' },
                        { title: 'User Routes And Auth', value: 'users' },
                    ]
                })];
            case 1:
                techUsed = _a.sent();
                if (techUsed.value.indexOf('users') !== -1) {
                    new fileClass_1.BoilerFile({ name: 'moongose', extension: 'js', path: app_root_path_1.default.path + "/server/db" }, files_1.default.nodeServer.mongo(projectName)).write();
                    new fileClass_1.BoilerFile({ name: 'index', extension: 'js', path: app_root_path_1.default.path + "/server" }, files_1.default.nodeServer.fullNodeIndex).write();
                    useMongo = true;
                }
                else if (techUsed.value.indexOf('mongo') !== -1) {
                    new fileClass_1.BoilerFile({ name: 'moongose', extension: 'js', path: app_root_path_1.default.path + "/server/db" }, files_1.default.nodeServer.mongo(projectName)).write();
                    new fileClass_1.BoilerFile({ name: 'index', extension: 'js', path: app_root_path_1.default.path + "/server" }, files_1.default.nodeServer.nodeIndexMongo).write();
                    useMongo = true;
                }
                else {
                    new fileClass_1.BoilerFile({ name: 'index', extension: 'js', path: app_root_path_1.default.path + "/server" }, files_1.default.nodeServer.normalNodeServer).write();
                }
                if (createPackageJsonG) {
                    if (useMongo) {
                        new fileClass_1.BoilerFile({ name: 'package', extension: 'json', path: app_root_path_1.default.path + "/server" }, files_1.default.nodeServer.packageJsonMongo(projectName)).write();
                    }
                    else {
                        new fileClass_1.BoilerFile({ name: 'package', extension: 'json', path: app_root_path_1.default.path + "/server" }, files_1.default.nodeServer.packageJsonNoMongo(projectName)).write();
                    }
                }
                console.log(chalk_1.default.green('Boiler Plate Generated!\n cd server \n npm i'));
                return [2 /*return*/];
        }
    });
}); };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var selectedBoilerPlate, userProjectName, createPackageJson;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prompts_1.default({
                    type: 'select',
                    name: 'value',
                    message: 'What Do You Want to Create?',
                    choices: [
                        { title: 'BackEnd Node Server', value: 'node-server' },
                        { title: 'Exit', value: null },
                    ],
                    initial: 1
                })];
            case 1:
                selectedBoilerPlate = _a.sent();
                return [4 /*yield*/, prompts_1.default({
                        type: 'text',
                        name: 'value',
                        message: 'What is the Name of your project?'
                    })];
            case 2:
                userProjectName = _a.sent();
                projectName = userProjectName.value;
                projectName = projectName.toLowerCase().replace(/\s/g, '');
                return [4 /*yield*/, prompts_1.default({
                        type: 'toggle',
                        name: 'value',
                        message: 'Do you want a package.json?'
                    })];
            case 3:
                createPackageJson = _a.sent();
                createPackageJsonG = createPackageJson.value;
                switch (selectedBoilerPlate.value) {
                    case 'node-server':
                        createNodeServer();
                        break;
                    case null:
                        break;
                }
                return [2 /*return*/];
        }
    });
}); })();
