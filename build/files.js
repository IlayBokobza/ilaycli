"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//node server files
var mongo = function (projectName) { return "const mongoose = require('mongoose')\n//connects to db\nmongoose.connect('mongodb://127.0.0.1:27017/" + projectName + "',{\n    useNewUrlParser:true,\n    useCreateIndex:true,\n    useUnifiedTopology:true,\n    useFindAndModify:false,\n})"; };
var fullNodeIndex = "const express = require('express')\n\n//start express\nconst app = express()\n\n//confing express to parse json\napp.use(express.json())\n\n//port swich for prod and dev\nconst port = process.env.PORT || 3000\n\n//runs file which connects to db\nrequire('./db/mongoose.js')\n\n//loads routes\nconst userRoutes = require('./routes/user')\napp.use(userRoutes)\n\n\n//listens for port (3000 for dev)\napp.listen(port,() => {\n    console.log(`Runing on port ${port}`)\n})";
var nodeIndexMongo = "const express = require('express')\n\n//start express\nconst app = express()\n\n//confing express to parse json\napp.use(express.json())\n\n//port swich for prod and dev\nconst port = process.env.PORT || 3000\n\n//runs file which connects to db\nrequire('./db/mongoose.js')\n\n\n//listens for port (3000 for dev)\napp.listen(port,() => {\n    console.log(`Runing on port ${port}`)\n})";
var normalNodeServer = "const express = require('express')\n\n//start express\nconst app = express()\n\n//confing express to parse json\napp.use(express.json())\n\n//port swich for prod and dev\nconst port = process.env.PORT || 3000\n\n//listens for port (3000 for dev)\napp.listen(port,() => {\n    console.log(`Runing on port ${port}`)\n})";
var packageJsonMongo = function (name) { return "{\n    \"name\": \"" + name + "\",\n    \"version\": \"1.0.0\",\n    \"description\": \"\",\n    \"main\": \"index.js\",\n    \"scripts\": {\n      \"test\": \"echo \"Error: no test specified\" && exit 1\"\n    },\n    \"author\": \"\",\n    \"license\": \"ISC\",\n    \"dependencies\": {\n      \"express\": \"^4.17.1\",\n      \"mongoose\": \"^5.11.8\"\n    }\n  }"; };
var packageJsonNoMongo = function (name) { return "{\n    \"name\": \"" + name + "\",\n    \"version\": \"1.0.0\",\n    \"description\": \"\",\n    \"main\": \"index.js\",\n    \"scripts\": {\n      \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"\n    },\n    \"author\": \"\",\n    \"license\": \"ISC\",\n    \"dependencies\": {\n      \"express\": \"^4.17.1\",\n      \"mongoose\": \"^5.11.8\"\n    }\n  }"; };
exports.default = {
    nodeServer: {
        mongo: mongo,
        fullNodeIndex: fullNodeIndex,
        nodeIndexMongo: nodeIndexMongo,
        normalNodeServer: normalNodeServer,
        packageJsonMongo: packageJsonMongo,
        packageJsonNoMongo: packageJsonNoMongo,
    }
};
