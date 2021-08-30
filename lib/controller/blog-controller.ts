import * as express from 'express'
import {addBlog, getBlogs, deleteBlog, approveBlog, getApprovedBlogs} from '../service/addBlog'


export default function getBlogController() {
    const router = express.Router()
    router.post('/addBlog', async (req, res) => {
        const { title, body, author } = req.body
        if (
          !title ||
          title.trim().length === 0 ||
          !body ||
          body.trim().length === 0 ||
        !author ||
        author.trim().length === 0
        ) {
          console.log('blog title or blog body or blog author is empty')
          res.status(400).send()
        }
     else{
        const response = await addBlog({ title, body, author})
    
        if (response) {
          res.status(200).send()
        } else {
          res.status(500).send()
        }
     }
    })

    router.post('/getBlogs', async (req, res) => {
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
        const response = await getBlogs({ username, page, limit})
    
        if (response) {
          res.status(200).json(response).send()
        } else {
          res.status(500).send()
        }
     }
    })

    router.delete('/deleteBlogs', async (req, res) => {
        const {title} = req.body
        if (
          !title ||
          title.trim().length === 0) {
          console.log('title is empty')
          res.status(400).send()
        }
     else{
        const response = await deleteBlog(title)
    
        if (response) {
          res.status(200).json({title}).send()
        } else {
          res.status(500).send()
        }
     }
    })

    router.post('/approveBlogs', async (req, res) => {
        const {title} = req.body
        if (
          !title ||
          title.trim().length === 0) {
          console.log('title is empty')
          res.status(400).send()
        }
     else{
        const response = await approveBlog(title)
    
        if (response) {
          res.status(200).json({title}).send()
        } else {
          res.status(500).send()
        }
     }
    })

    router.post('/getApprovedBlogs', async (req, res) => {
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
        const response = await getApprovedBlogs({ username, page, limit})
    
        if (response) {
          res.status(200).json(response).send()
        } else {
          res.status(500).send()
        }
     }
    })

    return router
}