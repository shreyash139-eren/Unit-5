const mongoose=require("mongoose")

const addressSchema=new mongoose.Schema({
    street:{type:String,required:true},
    city:{type:String,required:true},
    pincode:{type:Number,required:true},
    state:{type:String,required:true},
    country:{type:String, default:"India"},
    user:{type:mongoose.Schema.Types.ObjectId, ref:"user"}
})

const AddressModel=mongoose.model("address",addressSchema)
module.exports=AddressModel