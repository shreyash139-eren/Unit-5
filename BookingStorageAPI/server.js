let express=require("express")
let app=express()
let fs=require("fs")

app.use(express.json())

app.get("/books/search",(req,res)=>{
    let author=req.query.author
    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let books=data.books
   
    let book=books.filter((ele)=>{
        return ele.author.toLowerCase().includes(author.toLowerCase())
    })
    if(book){
        res.status(200).json({message:"Book Found",book})
    }else{
        res.status(404).json({message:"Book not found"})
    }
})

app.get("/books",(req,res)=>{
    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let books=data.books
    res.status(200).json({message:"All books",books})
})

app.post("/books",(req,res)=>{
    let book=req.body
    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let books=data.books

    let id=books[books.length-1].id+1
    book={id, ...book}
    books.push(book)
    fs.writeFileSync("./db.json",JSON.stringify(data))
    res.status(200).json({message:"Book Added"})
})

app.get("/books/:id",(req,res)=>{
    let id=+req.params.id
    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let books=data.books
    let index=books.findIndex((ele)=>ele.id===id)
    if(index===-1){
        res.status(400).json({message:"Book not found"})
    }else{
        books.forEach((ele)=>{
            if(ele.id===id){
                res.status(200).json({message:"Book found",ele})
            }
        })
    }
})

app.put("/books/:id",(req,res)=>{
    let id=+req.params.id
    let update=req.body
    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let books=data.books
    let index=books.findIndex((ele)=>ele.id===id)
    if(index===-1){
        res.status(404).json({message:"Book not Found"})
    }else{
        let updatesBooks=books.map((ele)=>{
            if(ele.id===id){
                return {...ele, ...update}
            }else{
                return ele
            }
        })
        data.books=updatesBooks
        fs.writeFileSync("./db.json",JSON.stringify(data))
        res.status(200).json({message:"Book Updated"})
    }
})

app.delete("/books/:id",(req,res)=>{
    let id=+req.params.id
    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let books=data.books

    let index=books.findIndex((book)=>book.id===id)
    if(index===-1){
        res.status(404).json({message:"Book not found"})
    }else{
        let updatedBooks=books.filter((ele)=>{
            return ele.id!==id
        })
        data.books=updatedBooks
        fs.writeFileSync("./db.json",JSON.stringify(data))
        res.status(200).json({message:"Book deleted"})
    }
})

app.use((req,res)=>{
    res.status(404).json({message:"404 Not Found"})
})

app.listen(3000,()=>{
    console.log("Server Running...")
})