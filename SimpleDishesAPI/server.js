const express=require("express")
const app=express()
const fs=require("fs")

app.use(express.json())

app.get("/dishes/get",(req,res)=>{
    let name=req.query.name
    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let dishes=data.dishes
    let flag=true
   
    let dish=dishes.filter((ele)=>{
        return ele.name.toLowerCase().includes(name.toLowerCase())
    })
    
    if(dish){
        res.status(200).json({message:"Dish",dish})
    }else{
        res.status(404).json({message:"Dish not found"})
    }
})

app.get("/dishes",(req,res)=>{
    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    res.status(200).json({message:"List of Dishes", dishes: data.dishes})
})

app.post("/dishes",(req,res)=>{
    let newDish=req.body
    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let dishes=data.dishes
    let id=dishes[dishes.length-1].id+1
    newDish={id, ...newDish}
    dishes.push(newDish)
    fs.writeFileSync("./db.json",JSON.stringify(data))
    res.status(200).json({message:"Dish Updated"})
})

app.get("/dishes/:id",(req,res)=>{
    let id=+req.params.id
    //console.log(id)
    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let dishes=data.dishes
    let index=dishes.findIndex((dish)=>dish.id===id)
    if(index===-1){
        res.status(404).json({message:"404 Dish Not Found"})
    }else{
        dishes.forEach((ele)=>{
            if(ele.id===id){
                res.status(200).json({message:"Dish Found", dish:ele})
            }
        })
    }
})

app.put("/dishes/:id",(req,res)=>{
    let id=+req.params.id
    let update=req.body
    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let dishes=data.dishes
    let index=dishes.findIndex((dish)=>dish.id===id)
    if(index===-1){
        res.status(404).json({message:"Dish not Found"})
    }else{
        let updatedDishes=dishes.map((ele)=>{
            if(ele.id===id){
                return{...ele, ...update}
            }else{
                return ele
            }
        })
        data.dishes=updatedDishes
        fs.writeFileSync("./db.json",JSON.stringify(data))
        res.status(200).json({message:"Dish updated"})
    }
})

app.delete("/dishes/:id",(req,res)=>{
    let id=+req.params.id
    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let dishes=data.dishes

    let index=dishes.findIndex((dish)=>dish.id===id)
    if(index===-1){
        res.status(404).json({message:"404 Dish not found"})
    }else{
        let updatedDishes=dishes.filter((ele)=>{
            return ele.id!==id
        })
        data.dishes=updatedDishes
        fs.writeFileSync("./db.json",JSON.stringify(data))
        res.status(200).json({message:"Dish deleted"})
    }

})

app.use((req,res)=>{
    res.status(404).json({message:"404 Not Found"})
})

app.listen(3000,()=>{
    console.log("Server Running...")
})