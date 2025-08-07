const MemberModel=require("../models/member.model")
const BookModel=require("../models/book.model")

const addBook=async(req,res)=>{
    try {
        await BookModel.create(req.body)
        res.status(201).json({message:"book added"})
    } catch (error) {
        res.status(500).json({error:"internal server error",error})
    }
}

const addMember=async(req,res)=>{
    try {
        await MemberModel.create(req.body)
        res.status(201).json({message:"member added"})
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
}

const borrowBook=async(req,res)=>{
    try {
        let {memberId,bookId}=req.body
        let member=await MemberModel.findById(memberId)
        let book=await BookModel.findById(bookId)
        if(!member || !book){
            return res.status(404).json({message:"member or book not found"})
        }
        if(book.status==="borrowed"){
            return res.status(404).json({message:"book already borrowed"})
        }
        member.borrowedBooks.push(bookId)
        book.borrowers.push(memberId)
        book.status="borrowed"
        await member.save()
        await book.save()
        res.status(200).json({message:"book borrowed"})
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
}

const returnBook=async(req,res)=>{
    try {
        let {memberId,bookId}=req.body
        let member=await MemberModel.findById(memberId)
        let book=await BookModel.findById(bookId)
        if(!member || !book){
            return res.status(404).json({message:"member or book not found"})
        }
        if(book.status==="available"){
            return res.status(400).json({message:"this book is not borrowed"})
        }
        member.borrowedBooks=member.borrowedBooks.filter((ele)=>ele.toString()!==bookId)
        book.borrowers=book.borrowers.filter((ele)=>ele.toString()!==memberId)
        book.status = "available"
        await member.save()
        await book.save()
        res.status(200).json({message:"book returned"})
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
}

const booksBorrowed=async(req,res)=>{
    try {
        let {memberId}=req.params
        let member=await MemberModel.findById(memberId).populate("borrowedBooks")
        if(!member){
            return res.status(404).json({message:"no user found"})
        }
        res.status(200).json({message:"books borrowed by member",member})
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
}

const booksBorrower=async(req,res)=>{
    try {
        let {bookId}=req.params
        let book=await BookModel.findById(bookId).populate("borrowers")
        if(!book){
            return res.status(404).json({message:"no book found"})
        }
        res.status(200).json({message:"all borrowers",book})
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
}

const updateBook=async(req,res)=>{
    try {
        let {bookId}=req.params
        let book= await BookModel.findById(bookId)
        if(!book){
            return res.status(404).json({message:"no book found"})
        }
        await BookModel.findByIdAndUpdate(bookId,req.body)
        res.status(200).json({message:"book updated"})
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
}

const deleteBook=async(req,res)=>{
    try {
        let {bookId}=req.params
        let book=await BookModel.findById(bookId)
        if(!book){
            return res.status(404).json({message:"no book found"})
        }
        await MemberModel.updateMany({borrowedBooks:bookId},{$pull:{borrowedBooks:bookId}})
        await BookModel.findByIdAndDelete(bookId)
        res.status(200).json({message:"book deleted"})
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
}

module.exports={addBook,addMember,borrowBook,returnBook,booksBorrowed,booksBorrower,updateBook,deleteBook}