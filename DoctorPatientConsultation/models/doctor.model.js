const mongoose=require("mongoose")

const doctorSchema=new mongoose.Schema({
    name:{type:String,required:true},
    specialization:{type:String,required:true},
    isActive: { type: Boolean, default: true }
})

const DoctorModel=mongoose.model("Doctors",doctorSchema)
module.exports=DoctorModel