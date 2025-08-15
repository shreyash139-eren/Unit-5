const express=require("express")
const app=express()
require("dotenv").config()
const connectToDB=require("./configs/db.config")

app.use(express.json())
connectToDB()

app.use((req,res)=>{
    res.status(404).json({message:"Invailid Route"})
})

app.listen(process.env.PORT,()=>{
    console.log("Server Running...")
})