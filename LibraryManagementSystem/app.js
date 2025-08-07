const express=require("express")
const app=express()
const connectToDB=require("./configs/db")
const libraryRouter = require("./routes/library.routes")

app.use(express.json())
connectToDB()

app.use("/",libraryRouter)

app.use((req,res)=>{
    res.status(404).json({error:"invalid route"})
})

app.listen(3000,()=>{
    console.log("Server Running...")
})