const {getData, addOrUpdateTodo}=require("../models/todosModel")

const getAllTodos=(req,res)=>{
    let todos=getData().todos
    res.status(200).json({message:"List of Todos",todos})
}

const addTodo=(req,res)=>{
    let newTodo=req.body
    let {data,todos}=getData()

    let id=todos[todos.length-1].id+1

    newTodo={id, ...newTodo}
    todos.push(newTodo)
    data.todos=todos
    addOrUpdateTodo(data)
    res.status(201).json({message:"New Todo added"})
}

const updateTodoById=(req,res)=>{
    let id=+req.params.id
    let update=req.body
    let {data,todos}=getData()

    let index=todos.findIndex((todo)=>todo.id===id)
    if(index===-1){
        res.status(404).json({message:"Todo not found"})
    }else{
        let updatedTodos=todos.map((ele)=>{
            if(ele.id===id){
                return {...ele, ...update}
            }else{
                return ele
            }
        })
        data.todos=updatedTodos
        addOrUpdateTodo(data)
        res.status(201).json({message:"Todo updated"})
    }
}

const deleteTodo=(req,res)=>{
    let id=+req.params.id
    let {data,todos}=getData()


    let index=todos.findIndex((todo)=>todo.id===id)
    if(index===-1){
        res.status(404).json({message:"No todo found"})
    }else{
        let updatedTodos=todos.filter((ele)=>{
            return ele.id!==id
        })
        data.todos=updatedTodos
        addOrUpdateTodo(data)
        res.status(200).json({message:"Todo deleted"})
    }
}

const searchByQuery=(req,res)=>{
    let query=req.query.q
    let {data,todos}=getData()
    let results=todos.filter((ele)=>{
        return ele.title.toLowerCase().includes(query.toLowerCase())
    })

    if(results.length>0){
        res.status(200).json({message:"Todo Found",results})
    }else{
        res.status(404).json({message:"No todo found"})
    }
}

module.exports={getAllTodos,addTodo,updateTodoById,deleteTodo,searchByQuery}