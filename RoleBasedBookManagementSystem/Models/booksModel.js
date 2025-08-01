const fs=require("fs")

const getData=()=>{
    let data=JSON.parse(fs.readFileSync("./books.json","utf-8"))
    let books=data.books
    return {data,books}
}

const addOrUpdate=(data)=>{
    fs.writeFileSync("./books.json",JSON.stringify(data))
}

module.exports={getData,addOrUpdate}