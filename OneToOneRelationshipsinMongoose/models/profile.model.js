const mongoose=require("mongoose")

const profileSchema=new mongoose.Schema({
    bio:{type:String},
    socialMediaLinks:[{type:String}],
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
})

const ProfileModel=mongoose.model("Profile",profileSchema)
module.exports=ProfileModel