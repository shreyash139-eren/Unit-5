const PublisherModel = require("../models/publisher.model");
const GameModel=require("../models/game.model")

const addPublisher = async (req, res) => {
  try {
    await PublisherModel.create(req.body);
    res.status(201).json({ message: "Publisher added" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" ,error});
  }
};

const getPublishers = async (req, res) => {
  try {
    let publishers = await PublisherModel.find();
    res.status(200).json({ message: "Publishers List", publishers });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getPublisherById = async (req, res) => {
  try {
    let { id } = req.params;
    let publisher = await PublisherModel.findById(id);
    if (!publisher) {
      return res.status(404).json({ message: "No Publisher Found" });
    }
    res.status(200).json({ message: "Publisher found", publisher });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updatePublisher = async (req, res) => {
  try {
    const { id } = req.params;
    const publisher = await PublisherModel.findById(id);
    if (!publisher) {
      return res.status(404).json({ message: "No publisher found" });
    }
    await PublisherModel.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "Publisher updated" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deletePublisher = async (req, res) => {
  try {
    const { id } = req.params;
    let publisher = await PublisherModel.findById(id);
    if (!publisher) {
      return res.status(404).json({ message: "No publisher found" });
    }
    await PublisherModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Publisher Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getAllGames=async(req,res)=>{
  try{
    const {publisherId}=req.params
    let publisher=await PublisherModel.findById(publisherId)
    if(!publisher){
      return res.status(404).json({message:"No publisher found"})
    }
    let games=await GameModel.find({publisher:publisherId}).populate()
    res.status(200).json({message:"All game created by this publisher",games})
  }catch(error){
    res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports={addPublisher,getPublishers,getPublisherById,updatePublisher,deletePublisher}