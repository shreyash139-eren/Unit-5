const express=require("express")
const limiter = require("../middlewares/limiter")
const apiRouter=express.Router()

apiRouter.get("/public",(req,res)=>{
    res.status(200).json({message: "This is a public endpoint!"})
})



apiRouter.get("/limited",limiter,(req,res)=>{
    res.status(200).json({message: "You have access to this limited endpoint!"})
})
module.exports=apiRouter