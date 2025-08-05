const UserModel=require("../models/user.model")

const addUser=async(req,res)=>{
    try {
        await UserModel.create(req.body)
        res.status(201).json({message:"User Created"})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

const addProfile=async(req,res)=>{
    try {
        const {userId}=req.params
        let user=await UserModel.findById(userId)
        if(!user){
            return res.status(404).json({message:"No User Found"})
        }
        const updatedUser = await UserModel.findByIdAndUpdate(userId,{profiles:req.body},{new:true,runValidators:true})
        res.status(201).json({message:"Profile added"})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

