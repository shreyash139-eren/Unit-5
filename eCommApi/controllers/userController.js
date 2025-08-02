const UserModel=require("../models/userModel")

const getUsers=async(req,res)=>{
    try {
        let users=await UserModel.find()
        res.status(200).json({message:"Users List",users})
    } catch (error) {
        res.status(500).json({Error:"Internal Server Error"})
    }
}

const addUser=async(req,res)=>{
    try{
        const {name,email,address}=req.body
        if(!name || !email){
            res.status(400).json({message:"Please Enter All Data."})
        }else{
        await UserModel.create(req.body)
        res.status(201).json({message:"User Created"})
        }
    }catch(error){
        res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports={getUsers,addUser}