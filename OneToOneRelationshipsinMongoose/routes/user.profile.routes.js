const express=require("express")
const userRouter=express.Router()
const {addUser,addProfile,getAllProfiles}=require("../controllers/user.controller")

userRouter.post("/add-user",addUser)

userRouter.post("/add-profile/:id",addProfile)

userRouter.get("/",getAllProfiles)

module.exports=userRouter