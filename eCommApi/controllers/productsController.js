const ProductModel=require("../models/productModel")

const getProducts=async(req,res)=>{
    try {
        const products=await ProductModel.find()
        res.status(200).json({message:"Products List",products})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

const addProduct=async(req,res)=>{
    try {
        const {name,category,price}=req.body

        if(!name || !category || !price){
            res.status(400).json({message:"Please add all informations "})
        }

        await ProductModel.create(req.body)
        res.status(201).json({message:"Product added"})
    } catch (error) {
        res.status(500).json({error:"Internal Server Problem"})
    }
}

const updateProduct=async(req,res)=>{
    try {
        let {id}=req.params
        let product= await ProductModel.findById(id)

        if(!req.body){
            res.status(400).json({message:"Please add information to update"})
        }

        if(!product){
            res.ststus(404).json({message:"No Product Found With This Id."})
        }else{
            await ProductModel.findByIdAndUpdate(id,req.body)
            res.status(202).json({message:"Product Updated"})
        }
    } catch (error) {
        res.status(500).json({Error:"Internal Servaer Error"})
    }
}

const deleteProduct=async(req,res)=>{
    try {
        let {id}=req.params
        let product= await ProductModel.findById(id)
        if(!product){
            res.status(404).json({message:"No Product Found With This Id."})
        }else{
            await ProductModel.findByIdAndDelete(id)
            res.status(202).json({message:"Product Deleted"})
        }
    } catch (error) {
        res.status(500).json({Error:"Internal Server Error"})
    }
}

module.exports={getProducts,addProduct,updateProduct,deleteProduct}