const express=require("express")
const app=express()
const connectToDB=require("./config/db")
const vehicleRouter=require("./routes/vehicle.routes")
app.use(express.json())
connectToDB()

app.use("/vehicles",vehicleRouter)

app.listen(3000,()=>{
    console.log("Server Running...")
})