const UserModel=require("../models/user.model")

const addUser=async(req,res)=>{
    try {
        await UserModel.create(req.body)
        res.status(201).json({mmessage:"User Added"})
    } catch (error) {
     res.status(500).json({error:"Something Went Wrong"})   
    }
}

const getRentals=async(req,res)=>{
    try {
        let {id}=req.params
        let user=await UserModel.findById(id).populate("rentedBooks")
        if(!user){
            return res.status(404).json({message:"no user found"})
        }
        res.status(200).json({message:"user and book list",user})
    } catch (error) {
     res.status(500).json({error:"Something Went Wrong"})   
    }
}

module.exports={addUser,getRentals}