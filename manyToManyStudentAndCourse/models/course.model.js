const mongoose=require("mongoose")

const courseSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    isActive:{type:Boolean,default:true}
})

const CourseModel=mongoose.model("Courses",courseSchema)
module.exports=CourseModel