const express=require("express")
const { signupUser, loginUser } = require("../controllers/user.controller")
const UserRouter=express.Router()

UserRouter.post("/signup",signupUser)

UserRouter.post("/login",loginUser)

module.exports=UserRouter