const express=require("express")
const vehicleRouter=express.Router()
const {addVehicle,getAllVehicles,updateVehicle,deleteVehicle,addTrip,updateTrip,deleteTrip}=require("../controllers/vehicle.controller")

vehicleRouter.post("/",addVehicle)

vehicleRouter.get("/",getAllVehicles)

vehicleRouter.patch("/:id",updateVehicle)

vehicleRouter.delete("/:id",deleteVehicle)

vehicleRouter.post("/trips/:id",addTrip)

vehicleRouter.patch("/trips/:id",updateTrip)

vehicleRouter.delete("/trips/:id",deleteTrip)

module.exports=vehicleRouter