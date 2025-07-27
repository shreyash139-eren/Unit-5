const url=require("url")

function parse(txt){
    const parsed=url.parse(txt,true)
    return {hostname:parsed.hostname,pathname:parsed.pathname,query:parsed.query}
}
module.exports=parse