const express=require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const AnalyticsRouter=express.Router()

AnalyticsRouter.get("/stats",authMiddleware(["Moderators"]),async(req,res)=>{
    try {
        // let mostUpvotedPosts=
        res.send("in progress")
    } catch (error) {
        res.send("error")
    }
})

module.exports=AnalyticsRouter