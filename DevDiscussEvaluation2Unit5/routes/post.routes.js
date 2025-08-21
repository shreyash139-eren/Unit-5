const express=require("express")
const { addPost } = require("../controllers/post.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const PostRouter=express.Router()

PostRouter.post("/",authMiddleware(["User","Moderator"]),addPost)

module.exports=PostRouter