const {getData,addOrUpdate}=require("../Models/booksModel")

const getBooks=(req,res)=>{
    let {data,books}=getData()
    let available=books.filter((ele)=>{
        return ele.status==="available"
    })

    if(available.length==0){
        res.status(204).json({message:"No books available to borrow"})
    }else{
        res.status(200).json({message:"Books to borrow",available})    }
}

const borrowBook=(req,res)=>{
    let id=+req.params.id
    let name=req.body.name

    if(name.trim().length===0){
        res.status(400).json({error:"Please provide your name."})
        return
    }

    let {data,books}=getData()

    let index=books.findIndex((ele)=>ele.id===id)
    if(index===-1){
        res.status(404).json({error:"No Book found"})
    }else{
        let time=new Date().toISOString().slice(0, 10)
        let updatedBooks=books.map((ele)=>{
            if(ele.id===id){
                return {...ele,status:"borrowed",borrowedBy:name,borrowedDate:time}
            }else{
                return ele
            }
        })
        data.books=updatedBooks
        addOrUpdate(data)
        res.status(202).json({message:`Book borrowed by ${name}`})
    }
}

const returnBook=(req,res)=>{
    let id=+req.params.id
    let {data,books}=getData()


    let index=books.findIndex((ele)=>ele.id===id)

    

    if(index===-1){
        res.status(404).json({error:"No book found"})
    }else{
        if(books[index].status==="available"){
            res.status(404).json({message:"This book isn't borrowed"})
        }
        let updatedBooks=books.map((ele)=>{
            if(ele.id===id && ele.status==="borrowed"){
               const  {borrowedBy,borrowedDate, ...remaining}=ele
                return {...remaining, status:"available" }
            }else{
                return ele
            }
        })

        data.books=updatedBooks
        addOrUpdate(data)
        res.status(202).json({message:"Book Returned"})
    }
}

module.exports={getBooks,borrowBook,returnBook}