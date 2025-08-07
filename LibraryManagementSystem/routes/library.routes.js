const {addBook,addMember,borrowBook,returnBook,booksBorrowed,booksBorrower,updateBook,deleteBook}=require("../controllers/library.controller")
const express=require("express")
const libraryRouter=express.Router()

libraryRouter.post("/add-book",addBook)

libraryRouter.post("/add-member",addMember)

libraryRouter.post("/borrow-book",borrowBook)

libraryRouter.post("/return-book",returnBook)

libraryRouter.get("/member-borrowed-books/:memberId",booksBorrowed)

libraryRouter.get("/book-borrowers/:bookId",booksBorrower)

libraryRouter.put("/update-book/:bookId",updateBook)

libraryRouter.delete("/delete-book/:bookId",deleteBook)

module.exports=libraryRouter