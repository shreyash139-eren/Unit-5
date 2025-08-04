const BookModel=require("../models/library.model")

const addBook=async(req,res)=>{
    try {
        await BookModel.create(req.body)
        res.status(201).json({message:"Book Added"})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}


const getBooksByQuery=async(req,res)=>{
    try {
        let {title,author}=req.query

        if(!title && !author){
            let books=await BookModel.find()
            res.status(200).json({message:"Books List",books})
         }

         const query={}
         if(title){
            query.title={$regex:title,$options:"i"}
         } 
         if(author){
             query.author={$regex:author,$options:"i"}
         }
     
         const books=await BookModel.find(query)
     
         if(books.length===0){
           return res.status(404).json({message:"No Book Found"})
         }
     
         res.status(200).json({message:"Books List",books})
        
        
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

const borrowBook=async(req,res)=>{
    try {
        let {id}=req.params
        let book=await BookModel.findById(id)
        if(!book){
            return res.status(404).json({message:"No Book Found"})
        }
        if(book.status==="available"){
        await BookModel.findByIdAndUpdate(id,req.body)
        return res.status(200).json({message:"Book Borrowed"})
        }
        return res.status(409).json({message:"Book not available to borrow"})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

const returnBook=async(req,res)=>{
    try {
        let {id}=req.params
        let book=await BookModel.findById(id)
        if(!book){
           return res.status(404).json({message:"No Book Found"})
        }
        await BookModel.findByIdAndUpdate(id,req.body)
        res.status(200).json({message:"Book Returned"})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

const deleteBookById=async(req,res)=>{
    try {
        let {id}=req.params
        let book=await BookModel.findById(id)
        if(!book){
           return res.status(404).json({message:"No Book found"})
        }
        await BookModel.findByIdAndDelete(id)
        res.status(200).json({message:"Book Deleted"})
    } catch (error) {
     res.status(500).json({message:"Internal Server Error"})   
    }
}

module.exports={addBook,getBooksByQuery,borrowBook,returnBook,deleteBookById}