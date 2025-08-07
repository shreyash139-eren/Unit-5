const mongoose=require("mongoose")

const memberSchema=new mongoose.Schema({
    name:{type:String,required:true,minlength:3},
    email:{type:String,required:true,unique:true},
    borrowedBooks:[{type:mongoose.Schema.Types.ObjectId,ref:"Books"}]
})

const MemberModel=mongoose.model("Members",memberSchema)
module.exports=MemberModel
// name: String, required, minimum length of 3 characters
// email: String, required, unique
// borrowedBooks: Array of ObjectIds (references to Book schema)