const jwt = require('jsonwebtoken')
const authMiddleware=(req,res,next)=>{
    let token=req.headers?.authorization?.split(" ")[1]
    if(token){
        var decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(decoded){
            req.user=decoded.userId
            next()
        }else{
            res.status(400).json({message:"login again"})
        }
    }else{
        res.status(500).json({message:"Something went wrong"})
    }
    
}