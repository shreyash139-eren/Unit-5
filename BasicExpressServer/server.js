const express=require("express")
const app=express()

app.get('/home',(req,res)=>{
    res.status(200).send("<h1>Welcome to Home Page</h1>")
})

app.get('/aboutus',(req,res)=>{
    res.status(200).json({message:"Welcome to About Us"})
})

app.get("/contactus",(req,res)=>{
    res.status(200).json({contact:"abc@gmail.com"})
})

app.use((req,res)=>{
    res.status(404).json({message:"404 Not Found!"})
})

app.listen(3000,()=>{
    console.log("Server started on port 3000!")
})