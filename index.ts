import express from 'express'
import mongoose from 'mongoose'
import getAuthMiddleWare from './lib/middleware/auth-middleware' 
import getLoginController from './lib/controller/login-controller'
import getBlogController from './lib/controller/blog-controller'
import getUserController from './lib/controller/user-controller'
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const port = 3001

async function initializeAndStartServer() {

    app.use(cors({
        origin: '*'
    }));

    app.use(express.json())

    app.use(getAuthMiddleWare('testjwtSecret'))

    mongoose.connect('mongodb://127.0.0.1:27017/', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      })

      app.use(
        '/bloggerServer',
        getLoginController(),
        getBlogController(),
        getUserController()
      )
    
      // Start the server
      app.listen(port, () => console.log(`Server listening on port ${port}!`))
}

initializeAndStartServer()