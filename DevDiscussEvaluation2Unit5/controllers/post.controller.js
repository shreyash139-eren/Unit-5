const PostModel=require("../models/post.model")
const TagModel=require("../models/tag.model")

const addPost=async(req,res)=>{
    try {
        const user=req.user
        const{title,content,tags}=req.body
        let tag=await TagModel.findOne({name:tags})
        if(!tag){
            await TagModel.create({name:tags})
            tag=await TagModel.findOne({name:tags})
        }
        await PostModel.create({title,content,author:user,tags:tag._id})
        res.status(201).json({message:"Post created"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong, please try again"})
    }
}

const getPosts=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

module.exports={addPost}