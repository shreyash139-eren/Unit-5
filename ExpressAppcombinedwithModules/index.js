const express=require("express")
const app=express()
const data=require("./read")
const os=require("os")
const dns=require("dns")

app.get("/test",(req,res)=>{
    res.send("Test route is working!")
})

app.get("/readfile",(req,res)=>{
    res.send(data())
})

app.get("/systemdetails",(req,res)=>{
    const platform=os.platform()
    const totalMemory=os.totalmem()
    const freeMemory=os.freemem()
    const cpuModel=os.cpus()[0].model
    res.json({platform:platform,totalMemory:totalMemory,freeMemory:freeMemory,cpuModel:cpuModel})
})

app.get("/getip",(req,res)=>{
    const hostName="masaischool.com"
        dns.lookup(hostName,(err,address)=>{
        res.json({hostname:hostName,ipAddress:address})
    })
})

app.listen(3000,()=>{
    console.log("Server is running on the port 3000!")
})