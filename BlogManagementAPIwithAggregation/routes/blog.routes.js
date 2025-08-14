const express=require("express")
const { addBlog, getBlogs, updateBlog, deleteBlog } = require("../controllers/blog.controller")
const BlogRouter=express.Router()

BlogRouter.post("/",addBlog)

BlogRouter.get("/",getBlogs)

BlogRouter.put("/:id",updateBlog)

BlogRouter.delete("/:id",deleteBlog)

module.exports=BlogRouter