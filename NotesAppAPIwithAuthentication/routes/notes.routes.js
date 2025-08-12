const express=require("express")
const { addNote, getNotes, updateNote, deleteNote } = require("../controllers/notes.controller")
const NoteRouter=express.Router()

NoteRouter.post("/",addNote)

NoteRouter.get("/",getNotes)

NoteRouter.put("/:id",updateNote)

NoteRouter.delete("/:id",deleteNote)

module.exports=NoteRouter