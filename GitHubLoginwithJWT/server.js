const express=require("express")
const app=express()
require("dotenv").config()
const connectToDB=require("./configs/db.config")
const UserRouter = require("./routes/user.routes")

app.use(express.json())
connectToDB()

app.use("/users",UserRouter)

app.get("/login",(req,res)=>{
    res.send("Please login again")
})

app.get("/test",(req,res)=>{
    res.send({message:"This is the test route"})
})

// app.use((req,res)=>{
//     res.status(404).json({message:"Invailid Route"})
// })

app.listen(process.env.PORT,()=>{
    console.log("Server Running...")
})