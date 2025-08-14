const express=require("express")
const app=express()
require("dotenv").config()
const connectToDB=require("./configs/db.config")
const UserRouter = require("./routes/user.routes")
const BlogRouter = require("./routes/blog.routes")
const authMiddleware = require("./middlewares/auth.middleware")

app.use(express.json())
connectToDB()

app.use("/",UserRouter)

app.use("/blogs",authMiddleware,BlogRouter)

app.use((req,res)=>{
    res.status(404).json({message:"Invalid Route"})
})

app.listen(process.env.PORT,()=>{
    console.log("Server Running...")
})
