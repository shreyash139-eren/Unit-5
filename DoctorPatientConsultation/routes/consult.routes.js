const {
  addDoctor,
  addPatient,
  consultDoc,
  patientsConsulted,
  doctorsConsulted,
  countPatients,
  getPatientsByGender,
  recentConsults,
  deleteDoctor,
  deletePatient,
} = require("../controllers/consult.controller");
const express = require("express");
const ConsultRouter = express.Router();

ConsultRouter.post("/doctors", addDoctor);

ConsultRouter.post("/patients", addPatient);

ConsultRouter.post("/consultations", consultDoc);

ConsultRouter.get("/doctors/:doctorId/patients", patientsConsulted);

ConsultRouter.get("/patients/:patientId/doctors", doctorsConsulted);

ConsultRouter.get("/doctors/:doctorId/consultations/count", countPatients);

ConsultRouter.get("/patients", getPatientsByGender);

ConsultRouter.get("/consultations/recent",recentConsults)

ConsultRouter.delete("/doctors/:doctorId",deleteDoctor)

ConsultRouter.delete("/patients/:patientId",deletePatient)

module.exports = ConsultRouter;
