const express=require("express")
const { addGame, getGames, getGameById, updateGame, deleteGame } = require("../controllers/game.controller")
const GameRouter=express.Router()


GameRouter.post("/games",addGame)

GameRouter.get("/games",getGames)

GameRouter.get("/games/:id",getGameById)

GameRouter.put("/games/:id",updateGame)

GameRouter.delete("/games/:id",deleteGame)

module.exports=GameRouter