const express=require("express")
const app=express()
const connectToDB=require("./config/db")
const userRouter = require("./routes/user.profile.routes")

app.use(express.json())
connectToDB()

app.use("/user",userRouter)

app.use((req,res)=>{
    res.status(404).json({Error:"Invalid Route"})
})

app.listen(3000,()=>{
    console.log("Server Running...")
})