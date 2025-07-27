const EventEmitter=require("events")
const eventLogger=new EventEmitter()

eventLogger.on("log",(txt)=>{
    const timestamp=new Date().toISOString()
    console.log(`[${timestamp}] ${txt}`)
})

module.exports=eventLogger