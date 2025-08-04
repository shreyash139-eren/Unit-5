const express=require("express")
const { getAllTasks, addTask, updateTaskById, deleteByPriority } = require("../controllers/task.controller")
const taskRouter=express.Router()
const {dataCheck,completionCheck} = require("../middleware/task.middleware")


taskRouter.get("/",getAllTasks)

taskRouter.post("/",dataCheck,completionCheck,addTask)

taskRouter.patch("/:id",completionCheck,updateTaskById)

taskRouter.delete("/:priority",deleteByPriority)

module.exports=taskRouter