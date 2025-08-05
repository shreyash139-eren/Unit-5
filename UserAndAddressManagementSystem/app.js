const express=require("express")
const app=express()
const connectToDB=require("./config/db")
const userRouter=require("./route/user.routes")

connectToDB()
app.use(express.json())

app.use("/users",userRouter)

app.listen(3000,()=>{
    console.log("Server Running")
})