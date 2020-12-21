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

  const userSchema = `const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//constrctor for user
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        validate(email){
            if(!validator.default.isEmail(email)){
                throw new Error('Please proived a valid email')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

// hashes password on create/change
userSchema.pre('save', async function(next){

    //if password was set/changes
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8)
    }

    next()
})


//methods for new jwt
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'secretTokenKey')
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

//deletes private data before sending to user
userSchema.methods.toJSON = function() {
    const userObject = this.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.__v

    return userObject
}

const User = mongoose.model('User',userSchema) 

//exports it
module.exports = User`

const authMiddleware = `const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,'secretTokenKey')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token':token })

        if(!user){
            throw new Error()
        }

        req.token = token
        req.user = user   
        next()
    } catch (err) {
        res.status(401).send({ error: 'Please authenticate' })
    }
}

module.exports = auth`

const userRoutes = `const express = require('express')
const router = new express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

//auth middleware
const auth = require('../middleware/auth')

//create new user
router.post('/api/users/signup',async (req,res) => {
    try {
        const user = new User(req.body)
        await user.save()

        //new auth token
        const token = await user.generateAuthToken()

        //send
        res.status(201).send({user,token})

        res.send()

    } catch (err) {
        if(err.keyPattern.email){
            return res.status(400).send('Email already taken')
        }
        res.status(500).send(err)
    }
})


//login user
router.post('/api/users/login', async (req,res) => {
    try {
        //looks for user
        const user = await User.findOne({email:req.body.email})

        //if user was not found
        if(!user){
            return res.status(400).send({error:'Email or password are incorrect.'})
        }

        const isPasswordOk = await bcrypt.compare(req.body.password,user.password)

        //if password in correct
        if(!isPasswordOk){
            return res.status(400).send({error:'Email or password are incorrect.'})
        }

        //new auth token
        const token = await user.generateAuthToken()

        //send
        res.send({ user, token })
    } catch (err) {
        res.status(500).send('Server error') 
    }
})


//logout user and delete token
router.post('/api/users/logout',auth,async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })

        await req.user.save()
        res.send(req.user)
        
    } catch (err) {
        res.status(500).send('Server error')
    }
})


//get user data
router.get('/api/users/me',auth,(req,res) => {
    try {
        res.send(req.user)
    } catch (err) {
        res.status(500).send('Server error')
    }
})


//edit user
router.patch('/api/users/me',auth, async (req,res) => {
    try{

        //checks for invaild operations
        const updates = Object.keys(req.body)
        const allowedUpdate = ['name','email','password']
        const isVaildOperation = updates.every(update => allowedUpdate.includes(update))


        if(!isVaildOperation){
            return res.status(500).send({ error:'Unallowed changes' })
        }
        

        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()

        res.send(req.user)
    } catch (err) {
        res.status(500).send('Server error') 
    }
})


//delete user
router.delete('/api/users/me',auth,async (req,res) => {
    try {
        await req.user.remove()
        
        res.send(req.user)
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router`


export default {
    nodeServer:{
        mongo,
        fullNodeIndex,
        nodeIndexMongo,
        normalNodeServer,
        userSchema,
        authMiddleware,
        userRoutes,
    }
}