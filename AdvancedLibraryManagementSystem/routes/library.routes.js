const express=require("express")
const libraryRouter=express.Router()
const {addBook,getBooksByQuery,borrowBook,returnBook,deleteBookById}=require("../controllers/library.controller")
const { dataCheck,borrowerCheck,overdueFees } = require("../middleware/library.middleware")


libraryRouter.get("/books",getBooksByQuery)

libraryRouter.post("/books",dataCheck,addBook)

libraryRouter.patch("/borrow/:id",borrowerCheck,borrowBook)

libraryRouter.patch("/return/:id",overdueFees,returnBook)

libraryRouter.delete("/books/:id",deleteBookById)

module.exports=libraryRouter