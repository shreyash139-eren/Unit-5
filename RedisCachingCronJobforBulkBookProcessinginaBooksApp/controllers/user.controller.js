const UserModel=require("../models/users.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const salt=10

const signup=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        let user=await UserModel.findOne({email})
        if(!user){
            bcrypt.hash(password,salt,async function(err,hash){
                if(err){
                    return res.status(500).json({message:"Something went wrong"})
                }else{
                    await UserModel.create({name,email,password:hash})
                    res.status(200).json({message:"Signup success"})
                }
            })
        }else{
            res.status(400).json({message:"User exists, please login"})
        }
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

const login=async(req,res)=>{
    try {
        let {email,password}=req.body
        let user=await UserModel.findOne({email})
        if(!user){
            return res.status(404).json({message:"No user found, please signup"})
        }else{
            let hash=user.password
            bcrypt.compare(password,hash).then(function(result){
                if(result===true){
                    let accessToken=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY)
                    let refreshToken=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:60*60*24*7})

                    res.status(200).json({message:"Login success",accessToken,refreshToken})
                }else{
                    res.status(401).json({message:"Wrong password"})
                }
            })
        }
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

module.exports={login,signup}