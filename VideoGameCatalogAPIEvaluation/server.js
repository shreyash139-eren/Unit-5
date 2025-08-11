const express=require("express")
const app=express()
const connectToDB=require("./config/db.config")
const PublisherRouter = require("./routes/publisher.routes")
require("dotenv").config()


app.use(express.json())
connectToDB()

app.use("/api",PublisherRouter)

app.use((req,res)=>{
    res.status(404).json({message:"Invalid Route"})
})

app.listen(process.env.PORT,()=>{
    console.log("Server Running...")
})