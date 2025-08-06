const express=require("express")
const app=express()
const connectToDb=require("./config/db")
const userRouter = require("./routes/user.routes")

app.use(express.json())
connectToDb()

app.use("/",userRouter)

app.listen(3000,()=>{
    console.log("Server Running...")
})