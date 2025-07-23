const os=require("os")

function getSystemInfo(){
    console.log("1.",os.arch())
    console.log("2.",os.cpus().length)
    console.log("3.",os.cpus())
    console.log("4.",os.type())
    console.log("5.",os.freemem(),os.totalmem())
    console.log("6.",os.hostname(),os.type())
    console.log("7.",process.memoryUsage().heapUsed, process.memoryUsage().heapTotal)
}

module.exports=getSystemInfo