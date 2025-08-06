const VehicleModel=require("../model/vehicle.model")

// Create a new vehicle
// Get all vehicles
// Update a vehicle's information
// Delete a vehicle

const addVehicle=async(req,res)=>{
    try {
        await VehicleModel.create(req.body)
        res.status(201).json({message:"Vehicle Created"})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

const getAllVehicles=async(req,res)=>{
    try {
        let vehicles=await VehicleModel.find()
        res.status(200).json({message:"Vehicles List",vehicle})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

const updateVehicle=async(req,res)=>{
    try {
        let {id}=req.params
        if(!req.body){
            res.status(400).json({message:"No data to update"})
        }
        let vehicle=await VehicleModel.findById(id)
        if(!vehicle){
            return res.status(404).json({message:"No vehicle found"})
        }
        await VehicleModel.findByIdAndUpdate(id,req.body)
        res.status(200).json({message:"Vehicle Updated"})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

const deleteVehicle=async(req,res)=>{
    try {
        const {id}=req.params
        let vehicle=await VehicleModel.findById(id)
        if(!vehicle){
            return res.status(404).json({message:"No Vehicle Found"})
        }
        await VehicleModel.findByIdAndDelete(id)
        res.status(200).json({message:"Vehicle Deleted"})
    } catch (error) {
        res.status(200).json({error:"Internal Server Error"})
    }
}


const addTrip=async(req,res)=>{
    try {
        let {id}=req.params
        let vehicle=await VehicleModel.findById(id)
        if(!vehicle){
            return res.status(404).json({message:"No Vehicle Found"})
        }
        vehicle.trips.push(req.body)
        await vehicle.save()
        res.status(201).json({message:"Trip added"})
    } catch (error) {
        res.status(500).json({error:"Something Went Wrong"})
    }
}

const updateTrip=async(req,res)=>{
    try {
        let {id}=req.params
        let trip=await VehicleModel.findById(id)
        if(!trip){
            res.status(404).json({message:"No trip found"})
        }
        await VehicleModel.findByIdAndUpdate(id,req.body)
        res.status(200).json({message:"Trip Updated"})
    } catch (error) {
        res.status(500).json({error:"Something Went Wrong"})
    }
}

const deleteTrip=async(req,res)=>{
    try {
        let {id}=req.params
        let trip=await VehicleModel.findById(id)
        if(!trip){
            res.status(404).json({message:"No trip found"})
        }
        await VehicleModel.findByIdAndDelete(id)
        res.status(200).json({message:"Trip Deleted"})
    } catch (error) {
        res.status(500).json({error:"Something Went Wrong"})
    }
}

module.exports={addVehicle,getAllVehicles,updateVehicle,deleteVehicle,addTrip,updateTrip,deleteTrip}