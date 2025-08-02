const mongoose=require("mongoose")

let time=new Date()

const orderSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    products:[{
        productId:{type:String,required:true},
        quantity:{type:Number,min:1,required:true}
    }
    ],
    totalAmount:Number,
    createdAt:time
})

const OrderModel=mongoose.model("orders",orderSchema)
module.expo