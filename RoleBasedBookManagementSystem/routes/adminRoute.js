const express=require("express")
const adminRouter=express.Router()
const {getAllBooks,addBook,updateDetails,deleteBook}=require("../controllers/adminBooksController")


adminRouter.patch("/books/:id",updateDetails)

adminRouter.get("/books",getAllBooks)

adminRouter.post("/books",addBook)

adminRouter.delete("/books/:id",deleteBook)


module.exports=adminRouter