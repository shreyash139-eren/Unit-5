const express=require("express")
const { signup, login } = require("../controllers/user.controller")
const UserRouter=express.Router()

UserRouter.post("/register",signup)

UserRouter.post("/login",login)

module.exports=UserRouter