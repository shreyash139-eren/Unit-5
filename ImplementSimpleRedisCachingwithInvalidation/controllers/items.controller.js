const ItemModel=require("../models/item.model")
const redis=require("../configs/redis.config")
const addItem=async(req,res)=>{
    try {
        let item=await ItemModel.create(req.body)
        redis.del("items")
        res.status(201).json({message:"Item added",item})
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

const getITems=async(req,res)=>{
    try {
        let cachedData=await redis.get("items")
        if(!cachedData){
            let items=await ItemModel.find()
            redis.set("items",JSON.stringify(items),"EX",60)
            res.status(200).json({message:"Items from DB",items})
        }else{
            let items=JSON.parse(cachedData)
            res.status(200).json({message:"Items from Redis",items})
        }
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

const updateItem=async(req,res)=>{
    try {
        let {id}=req.params
        let item=await ItemModel.findById(id)
        if(!item){
            return res.status(404).json({message:"No item found"})
        }else{
            await ItemModel.findByIdAndUpdate(id,req.body)
            redis.del("items")
            res.status(200).json({message:"Item updated"})
        }
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

const deleteItem=async(req,res)=>{
    try {
        let {id}=req.params
        let item=await ItemModel.findById(id)
        if(!item){
            return res.status(404).json({message:"No item found"})
        }else{
            await ItemModel.findByIdAndDelete(id)
            redis.del("items")
            res.status(200).json({message:"Item deleted"})
        }
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

module.exports={addItem,getITems,updateItem,deleteItem}