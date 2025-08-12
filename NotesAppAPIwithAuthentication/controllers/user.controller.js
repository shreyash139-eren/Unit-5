const UserModel=require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const signUp=async(req,res)=>{
    try {
        let salt=10
        const {name,email,password}=req.body
        bcrypt.hash(password,salt,async function(err,hash){
            if(err){
                return res.status(500).json({message:"Something went wrong, try again later"})
            }else{
                await UserModel.create({name,email,password:hash})
                res.status(201).json({message:"Signup success"})
            }
        })
    } catch (error) {
        res.status(500).json({message:"Something went wrong, try again later"})
    }
}

const logIn=async(req,res)=>{
    try {
        const {email,password}=req.body
        let user=await UserModel.findOne({email})
        if(!user){
            return res.status(404).json({message:"No user found, please signup"})
        }
        let hash=user.password
        bcrypt.compare(password,hash).then(function(result){
            if(result===true){
                var token=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY)
                res.status(200).json({message:"Login success",token})
            }else{
                res.status(401).json({message:"Wrong Password"})
            }
        })
    } catch (error) {
        res.status(500).json({message:"Something went wrong, try again later"})
    }
}

module.exports={signUp,logIn}