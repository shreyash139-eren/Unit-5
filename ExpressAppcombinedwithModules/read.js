const fs=require("fs")

function readData(){
        let data=fs.readFileSync("./Data.txt","utf-8")
        return data
}
module.exports=readData