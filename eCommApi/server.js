const express=require("express")
const app=express()
const productRouter=require("./routes/productRoutes")
const connectToDb = require("./configs/dataBaseConfig")
const userRouter = require("./routes/userRoute")
const orderRouter = require("./routes/orderRoutes")

//to parse incoming data in req.body
app.use(express.json())
//connecting to Database
connectToDb()

app.use("/products",productRouter)

app.use("/users",userRouter)

app.use("/orders",orderRouter)

app.listen(3000,()=>{
    console.log("Server Running...")
})
