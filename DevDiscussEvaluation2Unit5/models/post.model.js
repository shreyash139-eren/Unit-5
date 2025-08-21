const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
    title:{type:String,required:true,minlength:5},
    content:{type:String,required:true,minlength:20},
    author:{type:mongoose.Schema.Types.ObjectId,ref:"Users",required:true},
    tags:[{type:mongoose.Schema.Types.ObjectId,ref:"Tags"}],
    upvotes:[{type:mongoose.Schema.Types.ObjectId,ref:"Users",default:[]}],
    comments:[{
        user:{type:mongoose.Schema.Types.ObjectId,ref:"Users"},
        text:{type:String},
        createdAt:{type:Date,default:Date.now}
    }]
})

const PostModel=mongoose.model("Posts",postSchema)
module.exports=PostModel