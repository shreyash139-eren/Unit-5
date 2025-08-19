const express=require("express")
const AuthRouter=express.Router()
const {signup,login}=require("../controllers/auth.controller")

AuthRouter.post("/signup",signup)

AuthRouter.post("/login",login)

module.exports=AuthRouter