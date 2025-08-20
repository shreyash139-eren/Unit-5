const express=require("express")
const app=express()
const connectToDB=require("./configs/db.config")
const UserRouter = require("./routes/user.routes")
const authMiddleware = require("./middlewares/auth.middleware")
const BookRouter = require("./routes/book.routes")
require("dotenv").config()

app.use(express.json())
connectToDB()

app.use("/users",UserRouter)

app.use("/books",authMiddleware,BookRouter)

app.use((req,res)=>{
    res.status(404).json({message:"Invalid Route"})
})

app.listen(process.env.PORT,()=>{
    console.log("Server Running")
})