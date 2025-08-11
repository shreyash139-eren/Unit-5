const mongoose=require("mongoose")

const publisherSchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    location:{type:String},
    yearEstablished:{type:Number,max:1950}
})

const PublisherModel=mongoose.model("Publishers",publisherSchema)
module.exports=PublisherModel