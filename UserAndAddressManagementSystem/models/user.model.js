const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    age:{type:Number,required:true},
    addresses:[{ type: mongoose.Schema.Types.ObjectId, ref: "address" }]
})

const UserModel=mongoose.model("user",userSchema)
module.exports=UserModel