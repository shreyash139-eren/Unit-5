const express=require("express")
const connectToDB = require("./config/db")
const app=express()
const ConsultRouter=require("./routes/consult.routes")
require("dotenv").config()
app.use(express.json())
connectToDB()

app.use("/",ConsultRouter)

app.use((req,res)=>{
    res.status(404).json({message:"Route not found"})
})

app.listen(process.env.PORT,()=>{
    console.log("Server Running...")
})