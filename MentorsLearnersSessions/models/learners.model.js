const mongoose=require("mongoose")

const learnerSchema=new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    gender:{type:String,required:true,enum:["male","female"]},
    isActive:{type:Boolean,default:true}
})

const LearnerModel=mongoose.model("Learners",learnerSchema)
module.exports=LearnerModel