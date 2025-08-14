const BlogModel=require("../models/blog.model")

const addBlog=async(req,res)=>{
    try {
        await BlogModel.create({...req.body,createdBy:req.user})
        res.status(201).json({message:"Blog added"})
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

const getBlogs=async(req,res)=>{
    try {
        let blogs=await BlogModel.find({createdBy:req.user})
        res.status(200).json({message:"Blogs list",blogs})
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

const updateBlog=async(req,res)=>{
    try {
        let {id}=req.params
        let blog=await BlogModel.findById(id)
        if(!blog){
            return res.status(404).json({message:"No blog found"})
        }
        if(blog.createdBy.toString()!==req.user){
            return res.status(403).json({message:"Unauthorized"})
        }
        await BlogModel.findByIdAndUpdate(id,req.body)
        res.status(200).json({message:"Blog updated"})
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

const deleteBlog=async(req,res)=>{
    try {
        let {id}=req.params
        let blog=await BlogModel.findById(id)
        if(!blog){
            return res.status(404).json({message:"No blog found"})
        }
        if(blog.createdBy.toString()!==req.user){
            return res.status(403).json({message:"Unauthorized"})
        }
        await BlogModel.findByIdAndDelete(id)
        res.status(200).json({message:"Blog deleted"})
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

module.exports={addBlog,getBlogs,updateBlog,deleteBlog}