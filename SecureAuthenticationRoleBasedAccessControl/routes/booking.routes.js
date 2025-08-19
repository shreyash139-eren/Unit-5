const express=require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const BookingRouter=express.Router()
const {addBooking,getBookings,updateBooking,deleteBooking,approveBooking,rejectBooking}=require("../controllers/booking.controller")

BookingRouter.post("/",authMiddleware(["user"]),addBooking)

BookingRouter.get("/",authMiddleware(["user","admin"]),getBookings)

BookingRouter.put("/:id",authMiddleware(["user"]),updateBooking)

BookingRouter.delete("/:id",authMiddleware(["user","admin"]),deleteBooking)

BookingRouter.patch("/:id/approve",authMiddleware(["admin"]),approveBooking)

BookingRouter.patch("/:id/reject",authMiddleware(["admin"]),rejectBooking)


module.exports=BookingRouter