const UserModel=require("../models/user.model")
const ProfileModel=require("../models/profile.model")

const addUser=async(req,res)=>{
    try {
        await UserModel.create(req.body)
        res.status(201).json({message:"User Added"})
    } catch (error) {
        res.status(500).json({Error:"Something Went Wrong"})
    }
}

const addProfile=async(req,res)=>{
    try {
        const {id}=req.params
        let user=await UserModel.findById(id)
        if(!user){
            return res.status(404).json({message:"No user found"})
        }

        const exists=await ProfileModel.findOne({user:id})
        if(exists){
            return res.status(400).json({message:"Profile already exists for this user"})
        }
        const {bio,socialMediaLinks}=req.body
        if(!bio && !socialMediaLinks){
            return res.status(400).json({message:"No Data"})
        }
        await ProfileModel.create({bio,socialMediaLinks,user:id})
        res.status(201).json({message:"Profile Added"})
    } catch (error) {
        res.status(500).json({error:"Something Went Wrong"})
    }
}

module.exports={addUser,addProfile}