import * as jwt from 'jsonwebtoken'
import * as express from 'express'

export default function getAuthMiddleWare(secret: string) {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const authHeader = req.header('Authorization')
      if (authHeader) {
        const token = authHeader.split(' ')[1]
        if (token) {
          try {
            const decoded = jwt.verify(token, secret)
            if (decoded.version) {
              if (
                decoded.url !== req.url ||
                decoded.method !== req.method ||
                (req.method === 'POST' && decoded.body !== JSON.stringify(req.body))
              ) {
                throw new Error('Payload Mismatch')
              }
            }
            next()
          } catch (err) {
            res.status(401).send()
            console.log('JWT Token verification failed.')
          }
        } else {
          res.status(401).send()
          console.log('JWT Token not found.')
        }
      } else {
        res.status(401).send()
        console.log('Auth header not found.')
      }
    }
  }