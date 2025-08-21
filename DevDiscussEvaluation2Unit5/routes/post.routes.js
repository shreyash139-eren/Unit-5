const express=require("express")
const { addPost, getPosts, getPostsById, deletePost, addComment, addUpvote } = require("../controllers/post.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const PostRouter=express.Router()

PostRouter.post("/",authMiddleware(["User","Moderator"]),addPost)

PostRouter.get("/",getPosts)

PostRouter.get("/:postId",getPostsById)

PostRouter.delete("/:postId",authMiddleware(["User","Moderator"]),deletePost)

PostRouter.post("/:postId/comments",authMiddleware(["User","Moderator"]),addComment)

PostRouter.post("/:postId/upvote",authMiddleware(["User","Moderator"]),addUpvote)

module.exports=PostRouter