const mongoose=require("mongoose")

const patientSchema=new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    gender:{type:String,enum:["male","female"],required:true},
    isActive: { type: Boolean, default: true }
})

const PatientModel=mongoose.model("Patients",patientSchema)
module.exports=PatientModel