const express=require("express")
const app=express()
const connectToDB=require("./config/db.config")
const UserRouter = require("./routes/user.routes")
require("dotenv").config()

const PORT=process.env.PORT || 3000
app.use(express.json())
connectToDB()

app.use("/",UserRouter)

app.listen(PORT,()=>{
    console.log("Server Running...")
})