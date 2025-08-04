const TaskModel=require("../models/task.model")

const getAllTasks=async(req,res)=>{
    try {
        let tasks=TaskModel.find()
       res.status(200).json({message:"Task list",tasks})
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
}


const addTask=async(req,res)=>{
    try {
        await TaskModel.create(req.body)
        res.status(201).json({message:"task created"})
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
}


const updateTaskById=async(req,res)=>{
    try {
        let {id}=req.params
        let task=await TaskModel.findById(id)
        if(task.length===0){
            res.status(404).json({message:"no task found"})
        }else{
            await TaskModel.findByIdAndUpdate(id,req.body)
            res.status(200).json({message:"task updated"})
        }
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
}

const deleteByPriority=async(req,res)=>{
    try {
        let {priority}=req.params
        let task=await TaskModel.find({priority})
        if(task.length===0){
            res.status(404).json({message:"no task found"})
        }else{
            await TaskModel.deleteMany({priority})
            res.status(200).json({message:"task deleted"})
        }
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
}



module.exports={getAllTasks,addTask,updateTaskById,deleteByPriority}