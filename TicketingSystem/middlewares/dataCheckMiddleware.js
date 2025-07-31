const dataCheck=(req,res,next)=>{
    const {title, description, priority, user}=req.body
    if(!title || !description || !priority || !user){
        res.status(406).json({error: "Data insufficient, please provide all required fields"})
    }else{
        next()
    }
}
module.exports=dataCheck