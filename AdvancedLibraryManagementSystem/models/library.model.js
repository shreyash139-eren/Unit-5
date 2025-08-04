const mongoose=require("mongoose")

let booksSchema=new mongoose.Schema({
    title: String,
    author: String,
    status: {type:String,default:"available",enum:["available", "borrowed", "reserved"]},
    borrowerName: String,  
    borrowDate: Date,
    dueDate: Date,
    returnDate: Date,
    overdueFees: Number
})

let BookModel=mongoose.model("books",booksSchema)
module.exports=BookModel