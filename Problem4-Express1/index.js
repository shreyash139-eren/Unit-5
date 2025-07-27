const express=require("express")
const app=express()
const structure=require("./fileinfo")
const parse=require("./urlparser")

app.get("/test",(req,res)=>{
    res.send("Test route is working!",)
})

app.get("/fileinfo",(req,res)=>{
    const text=req.query.filepath
    const result=structure(text)
    res.send(result)
})

app.get("/parseurl",(req,res)=>{
    const txt=req.query.url
    res.send(parse(txt))
})

app.listen(3000,()=>{
    console.log("Server started on port 3000!")
})