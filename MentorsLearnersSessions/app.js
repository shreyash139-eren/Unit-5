const express=require("express")
const app=express()
const connectToDB=require("./configs/db")
const SessionRouter = require("./routes/session.route")

app.use(express.json())
require("dotenv").config()
connectToDB()

app.use("/",SessionRouter)

app.use((req,res)=>{
    res.status(404).json({message:"Invalid Route"})
})

app.listen(process.env.PORT,()=>{
    console.log("Server running...")
})