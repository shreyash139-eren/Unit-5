const express=require("express")
const app=express()
const todoRouter=require("./routes/todoRoutes")
app.use(express.json())

app.use("/todos",todoRouter)

app.use((req,res)=>{
    res.status(404).json({message:"Invalid Route"})
})


app.listen(3000,()=>{
    console.log("Server started...")
})
