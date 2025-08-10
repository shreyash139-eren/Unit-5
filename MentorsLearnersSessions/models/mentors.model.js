const mongoose=require("mongoose")

const mentorSchema=new mongoose.Schema({
    name:{type:String,required:true},
    gender:{type:String,required:true,enum:["male","female"]},
    age:{type:Number,required:true},
    isActive:{type:Boolean,default:true}
})

const MentorModel=mongoose.model("Mentors",mentorSchema)
module.exports=MentorModel