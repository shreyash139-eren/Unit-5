const mongoose=require("mongoose")

const connectToDB=async()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/UserProfile")
        console.log("Connectd to DB")
    } catch (error) {
        console.log("Error connecting DB")
    }
}

module.exports=connectToDB