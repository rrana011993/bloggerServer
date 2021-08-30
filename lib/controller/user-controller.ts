import * as express from 'express'
import {getUsers, deleteUser} from '../service/addUserService'

export default function getUserController() {
    const router = express.Router()

    router.post('/getUsers', async (req, res) => {
        const {username, page, limit} = req.body
        if (
          !username ||
          username.trim().length === 0 ||
        !limit ||
        limit === 0
        ) {
          console.log('username or page or limit is empty')
          res.status(400).send()
        }
     else{
        const response = await getUsers({ username, page, limit})
        if (response) {
          res.status(200).json(response).send()
        } else {
          res.status(500).send()
        }
     }
    })

    router.delete('/deleteUsers', async (req, res) => {
        const {username} = req.body
        if (
          !username ||
          username.trim().length === 0) {
          console.log('username is empty')
          res.status(400).send()
        }
     else{
        const response = await deleteUser(username)
    
        if (response) {
          res.status(200).json({username}).send()
        } else {
          res.status(500).send()
        }
     }
    })
    return router
}