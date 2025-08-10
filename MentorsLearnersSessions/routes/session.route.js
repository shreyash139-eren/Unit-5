const express=require("express")
const { addLearner, addMentor, addSession } = require("../controllers/session.controller")
const SessionRouter=express.Router()

SessionRouter.post("/learner",addLearner)

SessionRouter.post("/mentor",addMentor)

SessionRouter.post("/session",addSession)

module.exports=SessionRouter