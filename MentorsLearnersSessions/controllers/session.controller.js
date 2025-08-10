const LearnerModel = require("../models/learners.model");
const MentorModel = require("../models/mentors.model");
const SessionModel = require("../models/sessions.model");

const addLearner = async (req, res) => {
  try {
    await LearnerModel.create(req.body);
    res.status(201).json({ message: "Learner added" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const addMentor = async (req, res) => {
  try {
    await MentorModel.create(req.body);
    res.status(201).json({ message: "Mentor added" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const addSession = async (req, res) => {
  try {
    const { learnerId, mentorId } = req.body;
    let learner = await LearnerModel.findById(learnerId);
    if (!learner) {
      return res.status(404).json({ message: "learner not found" });
    }
    let mentor = await MentorModel.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ message: "mentor not found" });
    }
    await SessionModel.create(req.body);
    res.status(201).json({ message: "Session created" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports={addMentor,addLearner,addSession}