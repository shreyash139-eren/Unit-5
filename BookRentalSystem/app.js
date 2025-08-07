const express=require("express")
const app=express()
const connectToDB=require("./config/db")
const userRouter=require("./routes/user.routes")
const bookRouter=require("./routes/books.routes")
app.use(express.json())
connectToDB()

app.use("/books",bookRouter)

app.use("/users",userRouter)

app.use((req,res)=>{
    res.status(404).json({error:"invalid route"})
})

app.listen(3000,()=>{
    console.log("Server Running...")
})