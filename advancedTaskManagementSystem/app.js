const express=require("express")
const app=express()
const connectToDB=require("./config/db")
const taskRouter = require("./routes/task.routes")

app.use(express.json())
connectToDB()

app.use("/tasks",taskRouter)

app.listen(3000,()=>{
    console.log("Server Running..")
})