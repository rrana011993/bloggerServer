import express from 'express'
import mongoose from 'mongoose'
import getAuthMiddleWare from './lib/middleware/auth-middleware' 
import getLoginController from './lib/controller/login-controller'
import getBlogController from './lib/controller/blog-controller'
import getUserController from './lib/controller/user-controller'
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const port = process.env.PORT || 3001

async function initializeAndStartServer() {

    app.use(cors({
        origin: '*'
    }));

    app.use(express.json())

    app.use(getAuthMiddleWare('testjwtSecret'))

    mongoose.connect('mongodb+srv://rohitRana:superStrongPassword@cluster0.aqqqj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
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
      app.listen(port,'0.0.0.0', () => console.log(`Server listening on port ${port}!`))
}

initializeAndStartServer()
