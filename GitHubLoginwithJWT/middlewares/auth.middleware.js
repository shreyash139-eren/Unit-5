const jwt=require("jsonwebtoken")
require("dotenv").config()

const authMiddleware=(req,res,next)=>{
    let token =req.headers?.authorization?.split(" ")[1]
    if(token){
        let decoded= jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(decoded){
            req.user=decoded.userId
            next()
        }else{
            res.status(400).json({message:"Login again"})
        }
    }else{
        res.status(400).json({message:"Try again later"})
    }
}

module.exports=authMiddleware