const dataCheck=async(req,res,next)=>{
    try {
        const {title,description,priority}=req.body
        if(!title || !description || !priority){
            return res.status(400).json({message:"Incomplete Data Received"})
        }
        if(!["low","medium","high"].includes(priority)){
            return res.status(400).json({ message: "Priority should be either low, medium, or high" });
        }
        next()
    } catch (error) {
     res.status(500).json({error:"internal server error"})   
    }
}

const completionCheck=async(req,res,next)=>{
    try {
        let {isCompleted}=req.body
        if(isCompleted){
            req.body.completionDate=new Date()
        }
        next()
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
}

module.exports={dataCheck,completionCheck}