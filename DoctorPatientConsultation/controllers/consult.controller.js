const DoctorModel = require("../models/doctor.model");
const PatientModel = require("../models/patient.model");
const ConsultModel = require("../models/consultations.model");

const addDoctor = async (req, res) => {
  try {
    await DoctorModel.create(req.body);
    res.status(201).json({ message: "Doctor added" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const addPatient = async (req, res) => {
  try {
    await PatientModel.create(req.body);
    res.status(201).json({ message: "Patient added" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const consultDoc = async (req, res) => {
  try {
    const { doctorId, patientId } = req.body;
    let doctor = await DoctorModel.findById(doctorId);
    if (!doctor || doctor.isActive === false) {
      return res.status(404).json({ message: "No doctor found" });
    }
    let patient = await PatientModel.findById(patientId);
    if (!patient || patient.isActive === false) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await ConsultModel.create(req.body);
    res.status(201).json({ message: "Consultation added" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const patientsConsulted = async (req, res) => {
  try {
    const { doctorId } = req.params;
    let doctor = await DoctorModel.findById(doctorId);
    if (!doctor || doctor.isActive === false) {
      return res.status(404).json({ message: "No Doctor found" });
    }
    let consults = await ConsultModel.find({ doctorId: doctorId })
      .populate({ path: "patientId", select: "name age gender" })
      .sort({ consultedAt: -1 });
    consults = consults.filter((ele) => ele.isActive === true);

    res.status(200).json({ message: "Consultations", consults });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const doctorsConsulted = async (req, res) => {
  try {
    let { patientId } = req.params;
    let patient = await PatientModel.findById(patientId);
    if (!patient || patient.isActive === false) {
      res.status(404).json({ message: "No patient found" });
    }
    let consults = await ConsultModel.find({ patientId: patientId }).populate({
      path: "doctorId",
      slelect: "name specialization",
    });
    consults = consults.filter((ele) => ele.isActive === true);
    res.status(200).json({ message: "Consulted doctors", consults });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const countPatients = async (req, res) => {
  try {
    let { doctorId } = req.params;
    let doctor = await DoctorModel.findById(doctorId);
    if (!doctor || doctor.isActive === false) {
      return res.status(404).json({ message: "No doctor found" });
    }
    let count = await ConsultModel.countDocuments({ doctorId: doctorId });
    res.status(200).json({ message: `Total ${count} consulations.` });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getPatientsByGender = async (req, res) => {
  try {
    const { gender } = req.query;
    let patients = await PatientModel.find({
      gender: gender.toLowerCase(),
      isActive: true,
    });
    if (!patients) {
      return res.status(404).json({ message: "No patient found" });
    }
    res.status(200).json({ message: "Patients list", patients });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const recentConsults = async (req, res) => {
  try {
    let recent = await ConsultModel.find().sort({ consultedAt: 1 }).limit(5);
    if (!recent) {
      return res.status(404).json({ message: "No consults" });
    }
    res.status(200).json({ message: "Recent consults", recent });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    let doctor = await DoctorModel.findById(doctorId);
    if (!doctor || doctor.isActive === false) {
      return res.status(404).json({ message: "No doctor found" });
    }
    doctor.isActive = false;
    await doctor.save();

    await ConsultModel.updateMany({ doctorId }, { $set: { isActive: false } });
    res.status(200).json({ message: "Doctor deleted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deletePatient = async (req, res) => {
  try {
    let { patientId } = req.params;
    let patient = await PatientModel.findById(patientId);
    if (!patient || patient.isActive === false) {
      return res.status(404).json({ message: "No patient found" });
    }
    patient.isActive = false;
    await patient.save();

    await ConsultModel.updateMany({ patientId }, { $set: { isActive: false } });
    res.status(200).json({ message: "Patient deleted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
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
};
