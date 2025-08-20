const express=require("express")
const { addItem, getITems, updateItem, deleteItem } = require("../controllers/items.controller")
const ItemRouter=express.Router()

ItemRouter.post("/",addItem)

ItemRouter.get("/",getITems)

ItemRouter.put("/:id",updateItem)

ItemRouter.delete("/:id",deleteItem)

module.exports=ItemRouter