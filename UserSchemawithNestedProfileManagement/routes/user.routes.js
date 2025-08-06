const {addUser,addProfile,getAllUsers,searchUser,updateProfile,deleteProfile}=require("../controllers/user.controller")
const express=require("express")
const userRouter=express.Router()

userRouter.post("/add-user",addUser)

userRouter.post("/add-profile/:userId",addProfile)

userRouter.get("/get-users",getAllUsers)

userRouter.get("/search",searchUser)

userRouter.put("/update-profile/:userId/:profileName",updateProfile)

userRouter.delete("/delete-profile/:userId/:profileName",deleteProfile)

module.exports=userRouter