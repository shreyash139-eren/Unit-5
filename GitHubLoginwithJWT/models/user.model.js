const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String,required:true,unique:true},
    password:{type:String},
    role:{type:String,enum:["user","admin"],default:"user"},
    GitHubID:Number
})

const UserModel=mongoose.model("Users",userSchema)
module.exports=UserModel