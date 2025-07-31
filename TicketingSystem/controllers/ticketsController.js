const {getData,addOrUpdate}=require("../models/ticketsModel")

const getAllTickets=(req,res)=>{
    let tickets=getData().tickets
    res.status(200).json({message:"List of Tickets",tickets})
}

const addTicket=(req,res)=>{
    let newTicket=req.body
    let {data,tickets}=getData()
    let id=tickets[tickets.length-1].id+1
    newTicket={id, ...newTicket, status:"pending"}
    tickets.push(newTicket)
    data.tickets=tickets
    addOrUpdate(data)
    res.status(201).json({message:"Ticket Created"})
}

const getTicketById=(req,res)=>{
    let id=+req.params.id
    let {tickets}=getData()
    let needed=tickets.filter((ele)=>{
        return ele.id===id
    })
    if(needed.length===0){
        res.status(404).json({error:"Ticket not found"})
    }else{
        res.status(200).json({message:"Ticket found",needed})
    }
}

const updateTicketById=(req,res)=>{
    let id=+req.params.id
    let update=req.body
    let {data,tickets}=getData()
    let index=tickets.findIndex((ele)=>ele.id===id)
    if(index===-1){
        res.status(404).json({Error:"No ticket found."})
    }else{
        let updatedTickets=tickets.map((ele)=>{
            if(ele.id===id){
                return {...ele, ...update}
            }else{
                return ele
            }
        })
        data.tickets=updatedTickets
        addOrUpdate(data)
        res.status(200).json({Message:"Ticket Updated"})
    }
}

const deleteTicketById=(req,res)=>{
    let id=+req.params.id
    let {data,tickets}=getData()
    let index=tickets.findIndex((ele)=>ele.id===id)
    if(index===-1){
        res.status(404).json({Error:"No ticket found."})
    }else{
        let updatedTickets=tickets.filter((ele)=>{
            return ele.id!==id
        })
        data.tickets=updatedTickets
        addOrUpdate(data)
        res.status(200).json({message:"Ticket deleted"})
    }
}

const resolveTicket=(req,res)=>{
    let id=+req.params.id
    let {data, tickets}=getData()
    let index=tickets.findIndex((ele)=>ele.id===id)
    if(index===-1){
        res.status(404).json({message:"No ticket found"})
    }else{
       const updatedTickets=tickets.map((ele)=>{
        if(ele.id===id){
            return {...ele, status:"resolved"}
        }else{
            return ele
        }
       })
       data.tickets=updatedTickets
       addOrUpdate(data)
       res.status(200).json({message:"Ticket Resolved"})
    }
}

module.exports={getAllTickets, addTicket, getTicketById,updateTicketById, deleteTicketById, resolveTicket}