const TaskModel=require("../models/taskModel")

const getAllTasks=async(req,res)=>{
    try {
        let tasks=await TaskModel.find()
        res.status(200).json({message:"Tasks List",tasks})
    } catch (error) {
        res.status(500).json({Error: "Internal server error"})
    }
}

const addTask=async(req,res)=>{
    try {
        
        if(!req.body){
            return res.status(400).json({message:"No data found"})
        }else{
            let task=await TaskModel.create(req.body)
            res.status(201).json({message:"Task created",task})
        }
    } catch (error) {
        res.status(500).json({Error:"Internal server error"})
    }
}

const updateTask=async(req,res)=>{
    try {
        let {id}=req.params
        let task=await TaskModel.findById(id)
        if(!task){
           return res.status(404).json({message:"No task found"})
        }else{
            await TaskModel.findByIdAndUpdate(id,req.body)
            res.status(200).json({message:"Task updated"})
        }
    } catch (error) {
        res.status(500).json({Error:"Internal server error"})
    }
}

const deleteTask=async(req,res)=>{
    try {
        let {id}=req.params
        let task=await TaskModel.findById(id)
        if(!task){
            return res.status(404).json({message:"No task found"})
        }
        await TaskModel.findByIdAndDelete(id)
        res.status(200).json({messagae:"Task deleted"})
    } catch (error) {
        res.status(500).json({Error:"Internal server error"})
    }
}

module.exports={getAllTasks,addTask,updateTask,deleteTask}