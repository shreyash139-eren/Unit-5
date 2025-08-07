const express=require("express")
const userRouter=express.Router()
const {addUser,getRentals}=require("../controllers/user.controllers")

userRouter.post("/add-user",addUser)

userRouter.get("/user-rentals/:id",getRentals)


module.exports=userRouter