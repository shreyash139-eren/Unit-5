const express=require("express")
const JunctionRouter = require("./routes/routes")
const app =express()
const connectToDB=require("./config/db.config")
require('dotenv').config()

connectToDB()
app.use(express.json())

app.use("/",JunctionRouter)

app.use(()=>{
    res.status(404).json({message:"invalid route"})
})

app.listen(process.env.PORT,()=>{
    console.log("Server Running...")
})