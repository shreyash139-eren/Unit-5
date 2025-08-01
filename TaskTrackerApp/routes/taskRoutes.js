const express=require("express")
const {getAllTasks,getTasksById,addTasks,updateTaskById,deleteTaskById} = require("../controller/taskController")
const taskRouter=express.Router()

taskRouter.get("/",getAllTasks)

taskRouter.get("/:tag",getTasksById)

taskRouter.post("/",addTasks)

taskRouter.put("/:id",updateTaskById)

taskRouter.delete("/:id",deleteTaskById)


module.exports=taskRouter