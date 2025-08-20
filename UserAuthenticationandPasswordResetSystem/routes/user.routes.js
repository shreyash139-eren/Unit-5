const express=require("express")
const { signup, login, forgotPassword, resetPassword } = require("../controllers/user.controller")
const UserRouter=express.Router()

UserRouter.post("/signup",signup)

UserRouter.post("/login",login)

UserRouter.post("/forgotpassword",forgotPassword)

UserRouter.post("/resetpassword",resetPassword)

module.exports=UserRouter