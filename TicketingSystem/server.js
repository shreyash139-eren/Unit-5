const express=require("express")
const app=express()
const ticketRouter=require("./routes/ticketsRoutes")

app.use(express.json())

app.use("/tickets",ticketRouter)

app.use((req,res)=>{
    res.status(404).json({Error:"404 Not Found"})
})

app.listen(3000,()=>{
    console.log("Server started...")
})