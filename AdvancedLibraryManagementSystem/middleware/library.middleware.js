const BookModel=require("../models/library.model")

const dataCheck=async(req,res,next)=>{
    try {
        let {title,author}=req.body
        if(!title || !author){
            return res.status(400).json({message:"Incomplete Data"})
        }
        next()
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

const borrowerCheck=async(req,res,next)=>{
    try {
        let {borrowerName}=req.body
        if (!borrowerName) {
            return res.status(400).json({ message: "borrowerName is required" });
          }

        let count=await BookModel.countDocuments({borrowerName,status:"borrowed"})
        if(count>=3){
            return res.status(409).json({message:"Borrowing limit exceeded (max 3 books allowed)"})
        }

        const borrowDate=new Date();
        const dueDate=new Date();
        dueDate.setDate(dueDate.getDate() + 14)

        req.body.borrowDate=borrowDate
        req.body.dueDate=dueDate
        req.body.status="borrowed"
        next()
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}


const overdueFees=async(req,res,next) => {
    try {
        const {id}=req.params
        const {returnDate}=req.body

        if(!returnDate){
            returnDate=new Date()
        }

        const book=await BookModel.findById(id)

        if(!book || !book.dueDate) {
            return res.status(404).json({message:"Book not found or dueDate is missing"})
        }

        const actualReturnDate=new Date(returnDate)
        const expectedDueDate=new Date(book.dueDate)

        const diffInMs=actualReturnDate-expectedDueDate

        if(diffInMs>0){
            const diffInDays=Math.ceil(diffInMs/(1000*60*60*24))
            req.body.overdueFees=diffInDays*10
        }else{
            req.body.overdueFees = 0
        }

        req.body.status="available"
        req.body.returnDate=actualReturnDate

        next()
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}


module.exports={dataCheck,borrowerCheck,overdueFees}