const BookingModel=require("../models/booking.model")

const addBooking=async(req,res)=>{
    try {
        const bookedBy=req.user
        await BookingModel.create({...req.body,bookedBy})
        res.status(201).json({message:"Service booked"})
    } catch (error) {
        res.status(500).json({message:"Something went wrong, try again later"})
    }
}

const getBookings=async(req,res)=>{
    try {
        const role=req.role
        const id=req.user
        if(role==="user"){
            let bookings=await BookingModel.find({bookedBy:id})
            res.status(200).json({message:"Bookings list",bookings})
        }    
        let bookings=await BookingModel.find()
        res.status(200).json({message:"List of all bookings",bookings})   
    } catch (error) {
        res.status(500).json({message:"Something went wrong, try again later"})
    }
}

const updateBooking=async(req,res)=>{
    try {
        
        const {id}=req.params
        const userId=req.user
        let booking=await BookingModel.findById(id)
        if(!booking){
            return res.status(404).json({message:"No booking found"})
        }
        if(userId!==booking.bookedBy.toString()){
            return res.status(403).json({message:"Unauthorized"})
        }
        if(booking.status!=="pending"){
            return res.status(400).json({message:"Booking approved, unable to make changes"})
        }
        await BookingModel.findByIdAndUpdate(id,req.body)
        res.status(200).json({message:"Booking updated"})
    } catch (error) {
        res.status(500).json({message:"Something went wrong, try again later"})
    }
}

const deleteBooking=async(req,res)=>{
    try {
        const {id}=req.params
        const role=req.role
        const userId=req.user
        let booking=await BookingModel.findById(id)
        if(!booking){
            return res.status(404).json({message:"No booking found"})
        }
        if(role==="user"){
            if(userId!==booking.bookedBy.toString()){
                return res.status(403).json({message:"Unauthorized"})
            }else if(userId===booking.bookedBy.toString() && booking.status==="pending"){
                booking.status="cancelled"
                await booking.save()
                return res.status(200).json({message:"Booking Cancelled"})
            }else{
                return res.status(400).json({message:`Booking ${booking.status}`})
            }
        }else if(role==="admin"){
            if(booking.status==="pending"){
                booking.status="rejected"
                await booking.save()
                res.status(200).json({message:"booking rejected"})
            }else{
                res.status(400).json({message:`Booking ${booking.status}`})
            }
        }
    } catch (error) {
        res.status(500).json({message:"Something went wrong, try again later"})
    }
}



module.exports={addBooking,getBookings,updateBooking,deleteBooking}