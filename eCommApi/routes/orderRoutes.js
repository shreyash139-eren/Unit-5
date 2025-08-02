const express=require("express")
const { getAllOrders, addOrder } = require("../controllers/orderController")
const orderRouter=express.Router()


orderRouter.get("/",getAllOrders)

orderRouter.post("/",addOrder)

module.exports=orderRouter