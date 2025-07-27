const express=require("express")
const app=express()

app.get("/home",(req,res)=>{
    res.json({msg:"This is home page"})
})

app.get("/contactus",(req,res)=>{
    res.json({msg:"Contact us at contact@contact.com"})
})
app.get("/about",(req,res)=>{
    res.json({msg:"Welcome to the About page!"})
})

app.listen(3000,()=>{
    console.log("Server started on port 3000!")
})