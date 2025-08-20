const mongoose=require("mongoose")

const itemSchema=new mongoose.Schema({
    item:{type:String,required:true}
})

const ItemModel=mongoose.model("Items",itemSchema)
module.exports=ItemModel
