const mongoose=require("mongoose")

const studentSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    isActive:{type:Boolean,default:true}
})

const StudentModel=mongoose.model("Students",studentSchema)
module.exports=StudentModel