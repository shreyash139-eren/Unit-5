const express=require("express")
const userRouter=express.Router()
const {addUser,addProfile}=require("../controllers/user.controller")

userRouter.post("/add-user",addUser)

userRouter.post("/add-profile/:id",addProfile)

module.exports=userRouter