const fs=require("fs")

function readFileData(){
    let data=fs.readFileSync("./data.txt","utf-8")
    console.log(data)
}

function appendFileData(){
    let data=fs.appendFileSync("./data.txt"," This is Appended data")
    console.log("Appending data...")
}

module.exports={readFileData,appendFileData}