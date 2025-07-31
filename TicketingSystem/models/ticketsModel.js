const fs=require("fs")

const getData=()=>{
    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let tickets=data.tickets
    return {data,tickets}
}

const addOrUpdate=(data)=>{
    fs.writeFileSync("./db.json",JSON.stringify(data))
}

module.exports={getData, addOrUpdate}