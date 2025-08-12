const mongoose=require("mongoose")

const noteSchema=new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"Users"}
})

const NoteModel=mongoose.model("Notes",noteSchema)
module.exports=NoteModel