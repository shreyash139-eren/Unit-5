const express=require("express")
const { addNote, getNotes, updateNote, deleteNote } = require("../controllers/notes.controller")
const NoteRouter=express.Router()

NoteRouter.get("/",getNotes)

NoteRouter.post("/",addNote)

NoteRouter.put("/:id",updateNote)

NoteRouter.delete("/:id",deleteNote)

module.exports=NoteRouter