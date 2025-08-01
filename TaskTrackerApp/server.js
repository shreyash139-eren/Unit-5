const express=require("express")
const taskRouter = require("./routes/taskRoutes")
const app=express()


app.use(express.json())

app.use("/tasks",taskRouter)

app.use((req,res)=>{
    res.status(404).json({error:"Invlaid route"})
})


app.listen(3000,()=>{
    console.log("Server Running...")
})