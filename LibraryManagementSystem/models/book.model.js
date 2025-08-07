const mongoose=require("mongoose")


const bookSchema=new mongoose.Schema({
    title:{type:String,required:true,minlength:3},
    author:{type:String,required:true},
    status:{type:String,enum:["available", "borrowed"],required:true},
    borrowers:[{type:mongoose.Schema.Types.ObjectId,ref:"Members"}],
    createdAt:{type:Date,default:new Date()}
})

const BookModel=mongoose.model("Books",bookSchema)
module.exports=BookModel

// title: String, required, minimum length of 3 characters
// author: String, required
// status: Enum, required, values ["available", "borrowed"]
// borrowers: Array of ObjectIds (references to Member schema)
// createdAt: Date, default to the current date