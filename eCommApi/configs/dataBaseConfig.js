const mongoose=require("mongoose")

const connectToDb=async()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/eCommerce")
        console.log("Connected To DB")
    } catch (error) {
        console.log("Unable to Connect to Db", error)
    }
}

module.exports=connectToDb