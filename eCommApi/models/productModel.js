const mongoose=require("mongoose")

let time=new Date()
const productSchema=new mongoose.Schema({
    name:{type:String,required:true},
    category:{type:String,required:true},
    price:{type:Number,min:1,required:true},
    inStock:{type:Boolean,default:true},
    createdAt:{type:String,default:time}
})

const ProductModel=mongoose.model("products",productSchema)

module.exports=ProductModel