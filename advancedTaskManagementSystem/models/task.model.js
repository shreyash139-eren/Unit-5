const mongoose=require("mongoose")

const taskSchema=new mongoose.Schema({
    title:{type:String,unique:true},
    description:String,
    priority:String,
    isCompleted:{type:Boolean,default:false},
    completionDate:Date,
    dueDate:Date
})

const TaskModel=mongoose.model("Tasks",taskSchema)
module.exports=TaskModel