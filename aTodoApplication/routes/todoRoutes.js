const express=require("express")
const todoRouter=express.Router()
const {getAllTodos,addTodo,updateTodoById,deleteTodo,searchByQuery}=require("../controllers/todoController")

todoRouter.get("/",getAllTodos)

todoRouter.post("/",addTodo)

todoRouter.get("/search",searchByQuery)

todoRouter.put("/:id",updateTodoById)

todoRouter.delete("/:id",deleteTodo)

module.exports=todoRouter