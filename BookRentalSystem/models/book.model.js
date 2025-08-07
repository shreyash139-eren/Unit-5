const mongoose=require("mongoose")

const bookSchema=new mongoose.Schema({
    title:{type:String,required:true,minlength:3},
    author:{type:String,required:true},
    genre:{type:String},
    rentedBy:[{type:mongoose.Schema.Types.ObjectId,ref:"Users"}]
})

const BookModel=mongoose.model("Books",bookSchema)
module.exports=BookModel

// title: String, required, minimum length of 3 characters
// author: String, required
// genre: String, optional
// rentedBy: Array of ObjectIds (references to the User collection)