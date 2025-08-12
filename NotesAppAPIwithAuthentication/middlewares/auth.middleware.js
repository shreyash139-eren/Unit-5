const jwt=require("jsonwebtoken")

const authMiddleware=(req,res,next)=>{
        let token=req.headers?.authorization?.split(" ")[1]
        if(token){
            var decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
            if(decoded){
                req.user=decoded.userId
                next()
            }else{
                return res.status(400).json({message:"Login again"})
            }
        }else{
            return res.status(400).json({message:"Try Again"})
        }
   
}

module.exports=authMiddleware