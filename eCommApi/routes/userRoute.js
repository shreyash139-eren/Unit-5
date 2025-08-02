const express=require("express")
const userRouter=express.Router()
const {getUsers,addUser}=require("../controllers/userController")

userRouter.get("/",getUsers)

userRouter.post("/",addUser)

module.exports=userRouter