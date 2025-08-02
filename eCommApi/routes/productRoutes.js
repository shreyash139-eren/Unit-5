const express=require("express")
const { getProducts,addProduct, updateProduct, deleteProduct } = require("../controllers/productsController")
const productRouter=express.Router()


productRouter.get("/",getProducts)

productRouter.post("/",addProduct)

productRouter.patch("/:id",updateProduct)

productRouter.delete("/:id",deleteProduct)

module.exports=productRouter