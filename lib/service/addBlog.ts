import { Blog } from '../models/blogSchema'

export async function addBlog(blogData: any) {
    const blogDetails = { ...blogData }
    const blog = new Blog(blogDetails)
    try {
      await blog.save()
      console.log('Blog stored in DB')
      return true
    } catch (error) {
        console.log(`Error Occurred while adding blog. Title: '${blogData.title}. ${error}`)
    return false
  }
}

export async function getBlogs(payload:any){
    try {
        if(payload.username === 'ADMIN'){
            const blogs = await Blog.find().skip(parseInt(payload.page)*parseInt(payload.limit)).limit(parseInt(payload.limit)).exec()
            return blogs
        } else{
            const blogs = await Blog.find({ author: payload.username }).skip(parseInt(payload.page)*parseInt(payload.limit)).limit(parseInt(payload.limit)).exec()
        return blogs
        }
      } catch (error) {
          console.log(`Error Occurred while fetching blog. Author: '${payload.username}. ${error}`)
        return []
    }
}

export async function deleteBlog(title:string){
    try {
        await Blog.findOneAndRemove({ title}).exec()
        return true
        
      } catch (error) {
          console.log(`Error Occurred while fetching blog. Title: '${title}. ${error}`)
        return false
    }
}

export async function approveBlog(title:string){
    try {
        await Blog.updateOne({ title }, {approved:true})
        return true
        
      } catch (error) {
          console.log(`Error Occurred while fetching blog. Title: '${title}. ${error}`)
        return false
    }
}

export async function getApprovedBlogs(payload:any){
    try {
            const blogs = await Blog.find({ approved: true }).skip(parseInt(payload.page)*parseInt(payload.limit)).limit(parseInt(payload.limit)).exec()
        return blogs
      } catch (error) {
          console.log(`Error Occurred while fetching blog. Author: '${payload.username}. ${error}`)
        return []
    }
}