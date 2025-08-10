const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mentors",
    required: true,
  },
  learnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Learners",
    required: true,
  },
  topic:{type:String,required:true},
  createdAt:{type:Date,default:Date.now()},
  isActive:{type:Boolean,default:true}
});

const SessionModel=mongoose.model("Sessions",sessionSchema)
module.exports=SessionModel