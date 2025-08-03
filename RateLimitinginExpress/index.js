const express=require("express")
const apiRouter = require("./routes/api")
const app=express()



app.use("/api",apiRouter)




app.listen(3000,()=>{
    console.log("Server Running")
})