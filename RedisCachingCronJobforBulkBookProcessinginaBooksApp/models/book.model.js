const mongoose=require("mongoose")

const bookSchema=new mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    published:{type:Number,required:true},
    addedBy:{type:mongoose.Schema.Types.ObjectId,ref:"Users"}
})

const BookModel=mongoose.model("Books",bookSchema)
module.exports=BookModel