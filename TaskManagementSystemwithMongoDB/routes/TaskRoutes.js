const express=require("express")
const { getAllTasks, addTask, updateTask, deleteTask } = require("../controller/taskControllers")
const taskRouter=express.Router()

taskRouter.get("/",getAllTasks)

taskRouter.post("/",addTask)

taskRouter.patch("/:id",updateTask)

taskRouter.delete("/:id",deleteTask)

module.exports=taskRouter