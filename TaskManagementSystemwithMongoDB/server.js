const express=require("express")
const app=express()
const connectToDB=require("./configs/mongodbConfig")
const taskRouter = require("./routes/TaskRoutes")

app.use(express.json())

connectToDB()

app.use("/tasks",taskRouter)

app.listen(3000,()=>{
    console.log("Server Running")
})