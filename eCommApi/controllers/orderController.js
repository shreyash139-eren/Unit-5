const OrderModel=require("../models/orderModel")
const ProductModel = require("../models/productModel")


const getAllOrders=async(req,res)=>{
    try {
        let orders=await OrderModel.find()
        res.status(200).json({message:"Orders List",orders})
    } catch (error) {
        res.status(500).json({Error:"Internal Server Error"})
    }
}

const addOrder=async(req,res)=>{
    try {
        let {products,totalAmount}=req.body
        let {productId,quantity}=products[0]
        let product=await ProductModel.findById(productId).populate()
        cconsole.log(product,quantity)
    } catch (error) {
        res.status(500).json({Error:"Internal Server Error"})
    }
}

module.exports={getAllOrders,addOrder}