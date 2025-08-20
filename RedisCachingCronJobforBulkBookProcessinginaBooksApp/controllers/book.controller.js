const BookModel=require("../models/book.model")
const redis=require("../configs/redis.config")
const UserModel = require("../models/users.model")

let addBook=async(req,res)=>{
    try {
        const user=req.user
        await BookModel.create({...req.body,addedBy:user})
        redis.del(user)
        res.status(201).json({message:"Book added"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong"})
    }
}

let getbooks=async(req,res)=>{
    try {
        let user=req.user
        let cachedData=await redis.get(user)
        if(!cachedData){
            let books=await BookModel.find({addedBy:user})
            redis.set(user,JSON.stringify(books),"EX",120)
            res.status(200).json({message:"Books list from DB",books})
        }else{
            let books=JSON.parse(cachedData)
            res.status(200).json({message:"Books list from redis",books})
        }
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

const updateBook=async(req,res)=>{
    try {
        let user=req.user
        let {id}=req.params
        let book=await BookModel.findById(id)
        if(!book){
            return res.status(404).json({message:"No book found"})
        }
        await BookModel.findByIdAndUpdate(id,req.body)
        redis.del(user)
        res.status(200).json({message:"Book updated"})
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

const deleteBook=async(req,res)=>{
    try {
        let {id}=req.params
        let user=req.user
        let book=await BookModel.findById(id)
        if(!book){
            return res.status(404).json({message:"No book found"})
        }
        await BookModel.findByIdAndDelete(id)
        redis.del(user)
        res.status(200).json({message:"Book deleted"})
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

module.exports={addBook,getbooks,updateBook,deleteBook}