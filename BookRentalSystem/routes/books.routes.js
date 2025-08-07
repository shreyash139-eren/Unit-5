const {addBook,rentBook,returnBook,bookRenters,updateBook,deleteBook}=require("../controllers/books.controllers")
const express=require("express")
const bookRouter=express.Router()

bookRouter.post("/add-book",addBook)

bookRouter.post("/rent-book",rentBook)

bookRouter.post("/return-book",returnBook)

bookRouter.get("/book-renters/:bookId",bookRenters)

bookRouter.put("/update-book/:bookId",updateBook)

bookRouter.delete("/delete-book/:bookId",deleteBook)


module.exports=bookRouter