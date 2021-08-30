import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  body: {
    type: String,
    required: true
  },
  author:{
      type:String,
      default:''
  },
  approved:{
    type:Boolean,
    default:false
}
})

export const Blog = mongoose.model('Blog', BlogSchema)
