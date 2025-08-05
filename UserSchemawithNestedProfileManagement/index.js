const express=require("express")
const app=express()
const connectToDb=require("./config/db")

app.use(express.json())
connectToDb()

app.listen(3000,()=>{
    console.log("Server Running...")
})