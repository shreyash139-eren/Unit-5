const UserModel=require("../models/users.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const salt=10

const signupUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        bcrypt.hash(password,salt,async function(err,hash){
            if(err){
                return res.Status(500).json({message:"Try again later"})
            }else{
                await UserModel.create({name,email,password:hash})
                res.status(201).json({message:"Signup success"})
            }
        })
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body
        let user=await UserModel.findOne({email})
        if(!user){
            return res.status(404).json({message:"User not found, please signup"})
        }
        let hash=user.password
        bcrypt.compare(password,hash).then(function(result){
            if(result===true){
                let token=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY)
                res.status(200).json({message:"Login success",token})
            }else{
                res.status(401).json({message:"Wrong Password"})
            }
        })
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

module.exports={signupUser,loginUser}