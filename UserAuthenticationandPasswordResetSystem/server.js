const express=require("express")
const connectToDB = require("./configs/db.config")
const UserRouter = require("./routes/user.routes")
const app=express()
require("dotenv").config()
app.use(express.json())
connectToDB()

app.use("/",UserRouter)

app.use((req,res)=>{
    res.status(404).json({message:"Invalid route"})
})

app.listen(process.env.PORT,()=>{
    console.log("Server Running")
})