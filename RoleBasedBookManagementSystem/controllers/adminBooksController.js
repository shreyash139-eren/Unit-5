const {getData,addOrUpdate}=require("../Models/booksModel")

const getAllBooks=(req,res)=>{
    const {books}=getData()
    res.status(200).json({message:"All Books",books})
}

const addBook=(req,res)=>{
    let newBook=req.body
    const {data,books}=getData()
    let id=books[books.length-1].id+1 || 1
    newBook={id, ...newBook}
    books.push(newBook)
    data.books=books
    addOrUpdate(data)
    res.status(201).json({message:"Book Added"})
}

const updateDetails=(req,res)=>{
    let id=+req.params.id
    let update=req.body

    let {data,books}=getData()
    let index=books.findIndex((ele)=>ele.id===id)
    if(index===-1){
        res.status(404).json({error:"No Book Found"})
    }else{
        let updatedBooks=books.map((ele)=>{
            if(ele.id===id){
                return {...ele, ...update}
            }else{
                return ele
            }
        })
        data.books=updatedBooks
        addOrUpdate(data)
        console.log(update.status)
        res.status(202).json({message:"Book details Updated"})
    }
}

const deleteBook=(req,res)=>{
    let id=+req.params.id

    let {data,books}=getData()
    let index=books.findIndex((ele)=>ele.id===id)
    if(index===-1){
        res.status(404).json({error:"No book found"})
    }else{
        let updatedBooks=books.filter((ele)=>{
            return ele.id!==id
        })
        data.books=updatedBooks
        addOrUpdate(data)
        res.status(202).json({message:"Book deleted"})
    }
}

module.exports={getAllBooks,addBook,updateDetails,deleteBook}