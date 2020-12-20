//node server files
const mongo = (projectName:string) => `const mongoose = require('mongoose')
//connects to db
mongoose.connect('mongodb://127.0.0.1:27017/${projectName}',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
})`

const fullNodeIndex = `const express = require('express')

//start express
const app = express()

//confing express to parse json
app.use(express.json())

//port swich for prod and dev
const port = process.env.PORT || 3000

//runs file which connects to db
require('./db/mongoose.js')

//loads routes
const userRoutes = require('./routes/user')
app.use(userRoutes)


//listens for port (3000 for dev)
app.listen(port,() => {
    console.log(\`Runing on port \${port}\`)
})`

const nodeIndexMongo = `const express = require('express')

//start express
const app = express()

//confing express to parse json
app.use(express.json())

//port swich for prod and dev
const port = process.env.PORT || 3000

//runs file which connects to db
require('./db/mongoose.js')


//listens for port (3000 for dev)
app.listen(port,() => {
    console.log(\`Runing on port \${port}\`)
})`

const normalNodeServer  = `const express = require('express')

//start express
const app = express()

//confing express to parse json
app.use(express.json())

//port swich for prod and dev
const port = process.env.PORT || 3000

//listens for port (3000 for dev)
app.listen(port,() => {
    console.log(\`Runing on port \${port}\`)
})`

const packageJsonMongo = (name:string) => `{
    "name": "${name}",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
      "express": "^4.17.1",
      "mongoose": "^5.11.8"
    }
  }`

  const packageJsonNoMongo = (name:string) => `{
    "name": "${name}",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \\"Error: no test specified\\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
      "express": "^4.17.1",
      "mongoose": "^5.11.8"
    }
  }`

export default {
    nodeServer:{
        mongo,
        fullNodeIndex,
        nodeIndexMongo,
        normalNodeServer,
        packageJsonMongo,
        packageJsonNoMongo,
    }
}