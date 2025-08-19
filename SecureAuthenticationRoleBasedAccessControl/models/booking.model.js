const mongoose=require("mongoose")

const bookingSchema=new mongoose.Schema({
    serviceName:{type:String,required:true},
    reqOn:{type:Date,default:Date.now},
    status:{type:String,enum:["pending", "approved", "rejected", "cancelled"],default:"pending"},
    bookedBy:{type:mongoose.Schema.Types.ObjectId,ref:"Users"}
})

const BookingModel=mongoose.model("Bookings",bookingSchema)

module.exports=BookingModel