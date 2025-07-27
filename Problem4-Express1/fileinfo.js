const path=require("path")

function structure(txt){
    const baseName=path.basename(txt)
    const extension=path.extname(txt)
    const directory=path.dirname(txt)
    return {baseName:baseName,extension:extension,directory:directory}
}


module.exports=structure