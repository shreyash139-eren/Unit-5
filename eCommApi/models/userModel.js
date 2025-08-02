const mongoose=require("mongoose")

let time=new Date()
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    address:String,
    createdAt:{type:String,default:time}
})

const UserModel=mongoose.model("User",userSchema)
module.exports=UserModel