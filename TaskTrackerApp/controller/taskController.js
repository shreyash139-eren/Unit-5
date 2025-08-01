const {getData,addOrUpdate}=require("../models/taskModel")


const getAllTasks=(req,res)=>{
    const {tasks}=getData()
    res.status(200).json({message:"Tasks List",tasks})
}

const getTasksById=(req,res)=>{
    let tag=req.query.tag
    let {data,tasks}=getData()

    let filtered=tasks.filter((ele)=>{
        return ele.tag.toLowerCase().includes(tag.toLowerCase())
    })

    if(filtered.length===0){
        res.status(404).json({Error:"No task found"})
    }else{
        res.status(200).json({message:"Tasks found",filtered})
    }
}

const addTasks=(req,res)=>{
    let newTask=req.body
    let {data,tasks}=getData()
    let id=tasks[tasks.length-1].id+1

    newTask={id, ...newTask}
    tasks.push(newTask)
    data.tasks=tasks
    addOrUpdate(data)
    res.status(201).json({message:"Task Created"})
}

const updateTaskById=(req,res)=>{
    let id=+req.params.id
    let update=req.body
    let {data,tasks}=getData()

    let index=tasks.findIndex((ele)=>ele.id===id)

    if(index===-1){
        res.status(404).json({message:"No task found"})
    }else{
        let updatedTasks=tasks.map((ele)=>{
            if(ele.id===id){
                return {...ele, ...update}
            }else{
                return ele
            }
        })
        data.tasks=updatedTasks
        addOrUpdate(data)
        res.status(202).json({message:"Task updated"})
    }
}

const deleteTaskById=(req,res)=>{
    let id=+req.params.id
    let {data,tasks}=getData()

    let index=tasks.findIndex((ele)=>ele.id===id)
    if(index===-1){
        res.status(404).json({error:"No task found"})
    }else{
        updatedTasks=tasks.filter((ele)=>{
            return ele.id!==id
        })
        data.tasks=updatedTasks
        addOrUpdate(data)
        res.status(202).json({message:"Task deleted"})
    }
}

module.exports={getAllTasks,getTasksById,addTasks,updateTaskById,deleteTaskById}