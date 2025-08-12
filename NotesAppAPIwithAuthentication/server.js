const express=require("express")
const app=express()
require("dotenv").config()
const connectToDB=require("./config/db.config")
const UserRouter = require("./routes/user.routes")
const NoteRouter = require("./routes/notes.routes")
const authMiddleware=require("./middlewares/auth.middleware")

app.use(express.json())
connectToDB()

app.use("/",UserRouter)

app.use("/notes",authMiddleware,NoteRouter)

app.use((req,res)=>{
    res.status(404).json({message:"Invalid route"})
})

app.listen(process.env.PORT,()=>{
    console.log("Connected to DB")
})