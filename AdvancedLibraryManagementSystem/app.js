const express=require("express")
const connectToDb = require("./config/db")
const libraryRouter = require("./routes/library.routes")
const app=express()

app.use(express.json())
connectToDb()

app.use("/library",libraryRouter)

app.listen(3000,()=>{
    console.log("Server Running...")
})