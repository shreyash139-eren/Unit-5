const express=require("express")
const connectToDB = require("./configs/db.config")
const ItemRouter = require("./routes/item.routes")
const app=express()

app.use(express.json())
connectToDB()

app.use("/items",ItemRouter)

app.use((req,res)=>{
    res.status(404).json({message:"Invalid route"})
})

app.listen(3000,()=>{
    console.log("Server running")
})