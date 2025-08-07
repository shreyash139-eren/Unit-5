const BookModel=require("../models/book.model")
const UserModel=require("../models/user.model")

const addBook=async(req,res)=>{
    try {
        await BookModel.create(req.body)
        res.status(201).json({message:"book added"})
    } catch (error) {
        res.status(500).json({error:"something went wrong"})
    }
}

const rentBook=async(req,res)=>{
    try {
        let {userId,bookId}=req.body
        if(!userId || !bookId){
            return res.status(400).json({message:"missing userId or bookId"})
        }
        let user=await UserModel.findById(userId)
        let book=await BookModel.findById(bookId)
        if(!user || !book){
            return res.status(404).json({message:"user or book not found"})
        }
        user.rentedBooks.push(bookId)
        book.rentedBy.push(userId)
        await user.save()
        await book.save()
        res.status(200).json({message:"book rented"})
    } catch (error) {
        res.status(500).json({error:"something went wrong"})
    }
}

const returnBook=async(req,res)=>{
    try {
        let {userId,bookId}=req.body
        if(!userId || !bookId){
            return res.status(400).json({message:"missing userId or bookId"})
        }
        let user=await UserModel.findById(userId)
        let book=await BookModel.findById(bookId)
        if(!user || !book){
            return res.status(404).json({message:"user or book not found"})
        }
        const hasBook=user.rentedBooks.some((ele)=>ele.toString()===bookId)
        const hasUser=book.rentedBy.some((ele)=>ele.toString()===userId)

        if(!hasBook || !hasUser){
            return res.status(404).json({message:"this book is not rented by user"})
        }
        user.rentedBooks=user.rentedBooks.filter((ele)=>ele.toString()!==bookId)
        book.rentedBy=book.rentedBy.filter((ele)=>ele.toString()!==userId)

        await user.save()
        await book.save()
        res.status(200).json({message:"book returned"})
    } catch (error) {
        res.status(500).json({error:"something went wrong"})
    }
}

const bookRenters=async(req,res)=>{
    try {
        let {bookId}=req.params
        let book=await BookModel.findById(bookId).populate("rentedBy")
        if(!book){
            return res.status(404).json({message:"no book found"})
        }
        res.status(200).json({message:"list of book renters",book})
    } catch (error) {
        res.status(500).json({error:"something went wrong"})
    }
}

const updateBook=async(req,res)=>{
    try {
        let {bookId}=req.params
        let book=await BookModel.findById(bookId)
        if(!book){
            return res.status(404).json({message:"no book found"})
        }
        await BookModel.findByIdAndUpdate(bookId,req.body,{runValidators: true })
        res.status(200).json({message:"book updated"})
    } catch (error) {
        res.status(500).json({error:"something went wrong"})
    }
}

const deleteBook=async(req,res)=>{
    try {
        let {bookId}=req.params
        let book=await BookModel.findById(bookId)
        if(!book){
            return res.status(404).json({message:"no book found"})
        }
        await UserModel.updateMany({rentedBooks:bookId},{$pull:{rentedBooks:bookId}})
        await BookModel.findByIdAndDelete(bookId)
        res.status(200).json({message:"book deleted"})
    } catch (error) {
        res.status(500).json({error:"something went wrong"})
    }
}

module.exports={addBook,rentBook,returnBook,bookRenters,updateBook,deleteBook}