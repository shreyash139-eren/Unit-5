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
        const {id}=req.params
        let game=await GameModel.findById(id)
        if(!game){
            return res.status(404).json({message:"No game found"})
        }
        res.status(200).json({message:"Game found",game})
    } catch (error) {
       res.status(500).json({message:"Something went wrong"}) 
    }
}

const updateGame = async (req, res) => {
    try {
      const { id } = req.params;
      const game = await GameModel.findById(id);
      if (!game) {
        return res.status(404).json({ message: "No game found" });
      }
      await GamerModel.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Gmae updated" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  const deleteGame= async (req, res) => {
    try {
      const { id } = req.params;
      let game= await GameModel.findById(id);
      if (!game) {
        return res.status(404).json({ message: "No game found" });
      }
      await GameModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Game Deleted" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  module.exports={addGame,getGames,getGameById,updateGame,deleteGame}