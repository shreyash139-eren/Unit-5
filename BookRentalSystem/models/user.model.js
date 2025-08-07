const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{type:String,required:true,minlength:3},
    email:{type:String,required:true,unique:true},
    rentedBooks:[{type:mongoose.Schema.Types.ObjectId,ref:"Books"}]
})

const UserModel=mongoose.model("Users",userSchema)
module.exports=UserModel

// name: String, required, minimum length of 3 characters
// email: String, required, unique
// rentedBooks: Array of ObjectIds (references to the Book collection)