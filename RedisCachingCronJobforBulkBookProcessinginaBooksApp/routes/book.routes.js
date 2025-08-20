const express=require("express")
const BookRouter=express.Router()
const {addBook,getbooks,updateBook,deleteBook}=require("../controllers/book.controller")

BookRouter.post("/",addBook)

BookRouter.get("/",getbooks)

BookRouter.put("/:id",updateBook)

BookRouter.delete("/:id",deleteBook)

module.exports=BookRouter