const express=require("express")
const UserRouter=express.Router()
const {signUp,logIn}=require("../controllers/user.controller")

UserRouter.post("/signup",signUp)

UserRouter.post("/login",logIn)

module.exports=UserRouter