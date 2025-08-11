const mongoose=require("mongoose")

const gameSchema=new mongoose.Schema({
    title:{type:String,required:true},
    genre:{type:String,required:true,enum:["RPG","Action","Adventure","Strategy","Sports",]},
    releaseDate:{type:Date,default:Date.now()},
    publisher:{type:mongoose.Schema.Types.ObjectId,ref:"Publishers",required:true}
})

const GameModel=mongoose.model("Games",gameSchema)
module.exports=GameModel