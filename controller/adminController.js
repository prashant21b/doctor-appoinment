const USER=require('../models/user');
const Appointment=require('../models/appoinment');
const Doctor=require('../models/doctor');


exports.verifyDoctor=async (req,res)=>{
    try{
const {id}=req.params;
const doctor=await Doctor.findById(id);
doctor.isVerified=true;
await doctor.save();
res.status(200).json({
    sucess:true,
    data:doctor,
    message:"Doctor verified sucessfully"
})
    }
    catch(error){
res.status(500).json({
    sucess:true,
    message:"error in verification of doctor"
})
    }
}


exports.rejectDoctor=async (req,res)=>{
    try{
const {id}=req.params;
const result=await Doctor.findByIdAndRemove(id)

res.status(200).json({
    sucess:true,
    data:result,
    message:"Doctor Application Rejected"
})
    }
    catch(error){
res.status(500).json({
    sucess:true,
    message:"error in doctor rejection"
})
    }
}
