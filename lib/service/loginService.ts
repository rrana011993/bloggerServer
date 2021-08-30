import bcrypt from 'bcrypt'
import { User } from '../models/userSchema'

const salt = '$2b$10$NpWG3tUONdUicwgpsgKOF.'

export default async function validatePassword(username: string, password: string) {
    const user: any = await User.findOne({ username: username }).exec()
    if (!user) {
      throw new Error('Invalid Username')
    }
    const isValid = await bcrypt.compare(password, user.password)

    if(isValid){
       return {role:user.role, isAuthenticated:isValid, username}
    } else{
        return {isAuthenticated:isValid}
    }
  }
  
  export async function gethashedPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  }