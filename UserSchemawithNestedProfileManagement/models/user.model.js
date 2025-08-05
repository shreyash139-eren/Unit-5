const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:6},
    profiles:[{
        profileName:{type:String,required:true,enum:["fb", "twitter", "github", "instagram"]},
        url:{type:String,required:true}
    }]
})

const UserModel=mongoose.model("users",userSchema)
module.exports=UserModel