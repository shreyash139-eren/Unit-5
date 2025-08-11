const GameModel=require("../models/game.model")

const addGame=async(req,res)=>{
    try {
        await GameModel.create(req.body)
        res.status(201).json({message:"Game added"})
    } catch (error) {
       res.status(500).json({message:"Something went wrong"}) 
    }
}

const getGames=async(req,res)=>{
    try {
        const games=await GameModel.find()
        res.status(200).json({message:"Games List",games})
    } catch (error) {
       res.status(500).json({message:"Something went wrong"}) 
    }
}

const getGameById=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}