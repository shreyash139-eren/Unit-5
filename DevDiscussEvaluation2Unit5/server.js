const express=require("express")
const connectToDB = require("./configs/db.config")
const UserRouter = require("./routes/user.routes")
const PostRouter = require("./routes/post.routes")
const authMiddleware = require("./middlewares/auth.middleware")
const AnalyticsRouter = require("./routes/analytics.routes")
const app=express()
require("dotenv").config()

app.use(express.json())
connectToDB()

app.use("/api/auth/",UserRouter)

app.use("/api/posts",PostRouter)

// app.use("/api/analytics",AnalyticsRouter)

app.use((req,res)=>{
    res.status(404).json({message:"Invalid Route"})
})

app.listen(process.env.PORT,()=>{
    console.log("Server Running...")
})