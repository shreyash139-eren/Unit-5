const UserModel=require("../models/user.model")
const AddressModel=require("../models/address.model")

const addUser=async(req,res)=>{
    try {
        await UserModel.create(req.body)
        res.status(201).json({message:"User Created"})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

const addAddress=async(req,res)=>{
    try {
        let {userId}=req.params
        let user=await UserModel.findById(userId)
        if(!user){
            return res.status(404).json({message:"No User Found"})
        }

        const addressData={...req.body,user: user._id}

        const newAddress=await AddressModel.create(addressData)

        user.addresses.push(newAddress._id)
        await user.save()

        res.status(201).json({message:"Address Added"})
    } catch (error) {
        res.status(500).json({Error:"Internal Server Error"})
    }
}


const usersSummary=async(req,res)=>{
    try {
        let totalUsers=await UserModel.countDocuments()
        let totalAddresses=await AddressModel.countDocuments()
        let users=await UserModel.find()

        const userSummary = users.map(user => ({
            name: user.name,
            addressCount: user.addresses.length
        }))

        res.status(200).json({message:"Data",totalUsers,totalAddresses,users:userSummary})

    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

const getUserById=async(req,res)=>{
    try {
        let {userId}=req.params
        let user= await UserModel.findById(userId).populate("addresses")

        if(!user){
            return res.status(404).json({message:"No User Found"})
        }

        res.status(200).json({message:"User Found",user})
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}



module.exports={addUser,addAddress,getUserById,usersSummary}