const mongoose=require("mongoose")

const connectToDB=async()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/TaskDB")
        console.log("Connected to DB")
    } catch (error) {
        console.log("Unable to Coonect to DB")
    }
}

module.exports=connectToDB