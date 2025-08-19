const express=require("express")
const app=express()
const connectToDB=require("./configs/db.config")
const BookingRouter=require("./routes/booking.routes")
const AuthRouter = require("./routes/auth.routes")
require("dotenv").config()
app.use(express.json())
connectToDB()

app.use("/",AuthRouter)

app.use("/bookings",BookingRouter)

app.use((req,res)=>{
    res.status(404).json({message:"No route found"})
})

app.listen(process.env.PORT,()=>{
    console.log("Server Running")
})