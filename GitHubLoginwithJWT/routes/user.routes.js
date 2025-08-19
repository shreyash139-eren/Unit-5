const express=require("express")
const UserRouter=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const UserModel = require("../models/user.model")
const passport=require("passport")
const GitHubStrategy=require("passport-github2")
require("dotenv").config()

let salt=10

UserRouter.post("/signup",async(req,res)=>{
    try {
        const {name,email,password,role}=req.body
        bcrypt.hash(password,salt,async function(err,hash){
            if(err){
                return res.status(500).json({message:"Try again later"})
            }else{
                await UserModel.create({name,email,password:hash,role})
                res.status(201).json({message:"Signup success"})
            }
        })
    } catch (error) {
        return res.status(500).json({message:"Something went wrong"})
    }
})

UserRouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body
        let user=await UserModel.findOne({email})
        if(!user){
            return res.status(404).json("No user found, please sign up")
        }
        let hash=user.password
        bcrypt.compare(password,hash).then(function(result){
            if(result===true){
                let token=jwt.sign({userId:user._id, role:user.role},process.env.JWT_SECRET_KEY)
                res.status(200).json({message:"Login success",token})
            }
        })
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
})

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL:process.env.CALLBACK_URL
},
function(accessToken,refreshToken,profile,done){
    console.log(profile)
    return done(null,profile)
}
))

UserRouter.get("/auth/github",passport.authenticate("github",{scope:["user:email"]}))

UserRouter.get("/auth/github/callback",passport.authenticate("github",{session:false, failureRedirect:"/login"}),
async function(req,res){
    console.log(req.user)
    const id=req.user.id
    const user=await UserModel.find({GitHubID:id})
    if(user.length===0){
        let user=await UserModel.create({GitHubID:id,email:req.user.emails[0].value,name:req.user.displayName})
        let token=jwt.sign({userId:user._id, role:user.role},process.env.JWT_SECRET_KEY)
        res.status(200).json({message:"New User Login success",token})
    }else{
        let token=jwt.sign({userId:user._id, role:user.role},process.env.JWT_SECRET_KEY)
        res.status(200).json({message:"Existing User Login success",token})
    }
})

module.exports=UserRouter