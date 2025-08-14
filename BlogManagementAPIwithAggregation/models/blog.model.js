const mongoose=require("mongoose")

const blogSchema=new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    tags:[{type:String}],
    createdAt:{type:Date,default:Date.now()},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"Users"}
})

const BlogModel=mongoose.model("Blogs",blogSchema)
module.exports=BlogModel