const express=require("express")
const app=express()
const logger=require("./eventLogger")
const delay=require("./delay")

app.get("/test",(req,res)=>{
    res.send("Test route is working!")
})

app.get("/emit",(req,res)=>{
    const txt=req.query.message

    if (!txt) {
        return res.json({ error: "Please provide a message query parameter" });
    }

    const timestamp=new Date().toISOString()
    logger.emit("log",txt)
    res.json({status:"Event Logged",timestamp:timestamp})
})

app.get("/delay",async(req,res)=>{
    const txt=req.query.message
    const time=+req.query.time

    if (!txt && !time) {
        return res.json({ error: "Please provide a message and a time query parameter" });
    }

    if (!txt){
        return res.json({error:"Please provide a message parameter"});
    }
    if (!time){
        return res.json({error: "Please provide a delay parameter"});
    }

    const result=await delay(txt,time)
    res.send(result)
})

app.listen(3000,()=>{
    console.log("Server started on port 3000!")
})