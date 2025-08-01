const express=require("express")
const readerRouter=express.Router()

const {getBooks,borrowBook,returnBook}=require("../controllers/readerBooksController")

readerRouter.get("/books",getBooks)

readerRouter.post("/borrow/:id",borrowBook)

readerRouter.post("/return/:id",returnBook)

module.exports=readerRouter