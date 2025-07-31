const express=require("express")
const ticketRouter=express.Router()
const dataCheck=require("../middlewares/dataCheckMiddleware")
const {getAllTickets, addTicket, getTicketById,updateTicketById, deleteTicketById, resolveTicket}=require("../controllers/ticketsController")

ticketRouter.get("/",getAllTickets)

ticketRouter.get("/:id",getTicketById)

ticketRouter.post("/",dataCheck,addTicket)

ticketRouter.put("/:id",updateTicketById)

ticketRouter.delete("/:id",deleteTicketById)

ticketRouter.patch("/:id/resolve",resolveTicket)

module.exports=ticketRouter