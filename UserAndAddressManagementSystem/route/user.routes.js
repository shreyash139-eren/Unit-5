const express=require("express")
const userRouter=express.Router()
const {addUser,addAddress,getUserById,usersSummary}=require("../controller/user.controller")


userRouter.post("/:userId/address",addAddress)

userRouter.get("/summary",usersSummary)

userRouter.get("/:userId",getUserById)

userRouter.post("/",addUser)


module.exports=userRouter