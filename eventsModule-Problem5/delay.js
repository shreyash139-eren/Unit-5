const timers=require("timers")

function delay(txt,delay){
    return new Promise((resolve) => {
        timers.setTimeout(() => {
            resolve({
                message: txt,
                delay: `${delay}ms`
            })
        }, delay)
    })
}

module.exports=delay