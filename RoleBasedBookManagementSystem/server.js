const express=require("express")
const app=express()
const adminRouter=require("./routes/adminRoute")
const readerRouter=require("./routes/readerRoutes")

app.use(express.json())

app.use("/admin",adminRouter)

app.use("/reader",readerRouter)

app.listen(3000,()=>{
    console.log("Server started...")
})