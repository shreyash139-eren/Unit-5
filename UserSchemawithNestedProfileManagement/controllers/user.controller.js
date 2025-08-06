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
       user.profiles.push(req.body)
       await user.save()
        res.status(201).json({message:"Profile added"})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

const getAllUsers=async(req,res)=>{
    try {
        let {profile}=req.query
        if(!profile){
            let users=await UserModel.find()
            return res.status(200).json({message:"Users List",users})
        }
        let users=await UserModel.find({profile})
        if(users.length===0){
            return res.status(404).json({message:"No User Found"})
        }
        res.status(200).json({message:"Users found",users})
    } catch (error) {
        res.status(500).json({Error:"Internal Server Error"})
    }
}

const searchUser=async(req,res)=>{
    try {
        let {name,profile}=req.query
        if(!name){
            return res.status(400).json({message:"Name is required"})
        }
        let user=await UserModel.find({name})
        if(!user.length){
            return res.status(404).json({message:"No user found"})
        }
        if(profile){
            const filteredUsers=user.filter(user=>
              user.profiles.some(p=>p.profileName===profile)
            )
            if(filteredUsers.length){
                return res.status(200).json({message:"User and profile found",filteredUsers})
              }else{
                return res.status(200).json({message:"User found, but profile not found",user})
              }
        }
        res.status(200).json({message:"User found",user})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

const updateProfile=async(req,res)=>{
    try {
        let {userId,profileName}=req.params
        let {url}=req.body
        if(!userId || !profileName || !url){
            return res.status(400).json({message:"Please provide complete data"})
        }

        let user=await UserModel.findById(userId)
        if(!user){
            return res.status(404).json({message:"No user found"})
        }
        const profile=user.profiles.find(p=>p.profileName===profileName)
        if(!profile){
        return res.status(404).json({message:"Profile not found for the user"})
        }
        profile.url=url

        await user.save()

        res.status(200).json({message:"Profile Updated"})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

const deleteProfile=async(req,res)=>{
    try {
        let {userId,profileName}=req.params
        if(!userId || !profileName){
            return res.status(400).json({message:"Missing userId or profileName"})
        }
        let user=await UserModel.findByIdAndUpdate(userId,{$pull:{profiles:{profileName:profileName}}},{new:true})
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        res.status(200).json({message:"Profile deleted"})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports={addUser,addProfile,getAllUsers,searchUser,updateProfile,deleteProfile}