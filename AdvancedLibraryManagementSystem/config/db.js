const mongoose=require("mongoose")

const connectToDb=async()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/libraryDB")
        console.log("Connected to DB")
    } catch (error) {
        console.log("Error connecting DB")
    }
}

module.exports=connectToDb