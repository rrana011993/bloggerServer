import { gethashedPassword } from './loginService'
import { User } from '../models/userSchema'

export async function addUser(userInfo: any) {
    const hashedPassword = await gethashedPassword(userInfo.password)
    const userDetails = { username: userInfo.username, password: hashedPassword, role:userInfo.role }
    const user = new User(userDetails)
    try {
      await user.save()
      console.log('User data stored in DB')
      return true
    } catch (error) {
        console.log(`Error Occurred while adding user. Username: '${userInfo.username}. ${error}`)
    return false
  }
}

export async function getUsers(payload:any){
    try {
            const users = await User.find().select('username').skip(parseInt(payload.page)*parseInt(payload.limit)).limit(parseInt(payload.limit)).exec()
            return users
      } catch (error) {
          console.log(`Error Occurred while fetching users. ${error}`)
        return []
    }
}

export async function deleteUser(username:string){
    try {
        await User.findOneAndRemove({ username}).exec()
        return true
        
      } catch (error) {
          console.log(`Error Occurred while fetching blog. User: '${username}. ${error}`)
        return false
    }
}