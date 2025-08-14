const NoteModel=require("../models/notes.model")

const addNote=async(req,res)=>{
    try {
        await NoteModel.create({...req.body,createdBy:req.user})
        res.status(201).json({message:"Note added"})
    } catch (error) {
        res.status(500).json({message:"Something went wrong, please try again later"})
    }
}

const getNotes=async(req,res)=>{
    try {
        let notes=await NoteModel.find({createdBy:req.user})
        res.status(200).json({message:"Notes List",notes})
    } catch (error) {
        res.status(500).json({message:"Something went wrong, please try again later"})
    }
}

const updateNote=async(req,res)=>{
    try {
        let {id}=req.params
        let note=await NoteModel.findById(id)
        if(!note){
            return res.status(404).json({message:"No note found"})
        }
        console.log(note.createdBy)
        if(note.createdBy.toString() !== req.user){
            return res.status(403).json({message:"Unauthorized"})
        }
        await NoteModel.findByIdAndUpdate(id,req.body)
        res.status(200).json({message:"Note updated"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong, please try again later",error})
    }
}

const deleteNote=async(req,res)=>{
    try {
        let {id}=req.params
        let note=await NoteModel.findById(id)
        if(!note){
            return res.status(404).json({message:"No note found"})
        }
        if(note.createdBy.toString()!==req.user){
            return res.status(403).json({message:"Unauthorized"})
        }
        await NoteModel.findByIdAndDelete(id)
        res.status(200).json({message:"Note deleted"})
    } catch (error) {
        res.status(500).json({message:"Something went wrong, please try again later"})
    }
}

module.exports={addNote,getNotes,updateNote,deleteNote}