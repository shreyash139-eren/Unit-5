const express=require("express")
const app=express()
const fs=require("fs")

app.use(express.json())

app.get("/students/search",(req,res)=>{
    let course=req.query.course


    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let students=data.students

    let student=students.filter((ele)=>{
        return ele.course.toLowerCase().includes(course.toLowerCase())
    })

    if(student.length>0){
        res.status(200).json({message:"Student Found",student})
    }else{
        res.status(404).json({message:"Student Not Found"})
    }
})

app.get("/students",(req,res)=>{
    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let students=data.students
    res.status(200).json({message:"All Students",students})
})

app.get("/students/:id",(req,res)=>{
    let id=+req.params.id
    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let students=data.students

    let index=students.findIndex((ele)=>ele.id===id)
    if(index===-1){
        res.status(404).json({message:"No student found"})
    }else{
        students.forEach((ele)=>{
            if(ele.id===id){
                res.status(200).json({message:"Student found",ele})
            }
        })
    }
})

app.post("/students",(req,res)=>{
    let newStudent=req.body
    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let students=data.students

    let id=students[students.length-1].id+1
    newStudent={id, ...newStudent}
    students.push(newStudent)
    fs.writeFileSync("./db.json",JSON.stringify(data))
    res.status(200).json({message:"Student Added"})
})

app.put("/students/:id",(req,res)=>{
    let id=+req.params.id
    let update=req.body

    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let students=data.students

    let index=students.findIndex((ele)=>ele.id===id)

    if(index===-1){
        res.status(404).json({message:"Student Not Found"})
    }else{
        updatedStudent=students.map((ele)=>{
            if(ele.id===id){
                return {...ele, ...update}
            }else{
                return ele
            }
        })
        data.students=updatedStudent
        fs.writeFileSync("./db.json",JSON.stringify(data))
        res.status(200).json({message:"Student Info Updated"})
    }
})

app.delete("/students/:id",(req,res)=>{
    let id=+req.params.id
    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let students=data.students

    let index=students.findIndex((ele)=>ele.id===id)
    if(index===-1){
        res.status(404).json({message:"Student Not Found"})
    }else{
        let updatedStudents=students.filter((ele)=>{
            return ele.id!==id
        })
        data.students=updatedStudents
        fs.writeFileSync("./db.json",JSON.stringify(data))
        res.status(200).json({message:"Student Info Deleted"})
    }
})

app.use((req,res)=>{
    res.status(404).json({message:"404 Route Not Found"})
})

app.listen(3000,()=>{
    console.log("Server Running...")
})