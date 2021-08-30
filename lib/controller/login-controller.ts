import * as express from 'express'
import validatePassword from '../service/loginService'
import {addUser} from '../service/addUserService'


export default function getLoginController() {
    const router = express.Router()
    router.post('/login', async (req, res) => {
        const { username, password } = req.body
        if (!username || !password || password.trim().length === 0) {
          console.log('Username or Password is empty')
          res.status(400).json({isAuthenticated:false}).send()
        }
        else{
            try {
                const response = await validatePassword(username, password)
                res.status(200).json(response).send()
              } catch (error) {
                  console.log(`Error ocurred while login. Username: '${username}. ${error}`)
                res.status(401).json({isAuthenticated:false}).send()
              }
        }
      })

      router.post('/addUser', async (req, res) => {
        const { username, role, password } = req.body
        if (
          !role ||
          role.trim().length === 0 ||
          !username ||
          username.trim().length === 0 ||
        !password ||
        password.trim().length === 0
        ) {
          console.log('Username or role or password is empty')
          res.status(400).send()
        }
     else{
        const response = await addUser({ username, role, password})
    
        if (response) {
          res.status(200).send()
        } else {
          res.status(500).send()
        }
     }
        
      })
      return router
}