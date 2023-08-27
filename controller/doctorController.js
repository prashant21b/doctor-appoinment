const mongoose=require('mongoose')
const Doctor=require('../models/doctor')

const USER=require('../models/user');
const doctor = require('../models/doctor');
exports.applyDoctor=async (req,res)=>{
    try {
        const {userId,firstName,lastName,phone,email,website,address,specialization,experience,fee,startingTime,endingTime}=req.body;
        console.log(req.body)
        const user=await USER.findById(userId)
        console.log("user->",user)
        if(!user){
           return res.status(404).json({
            sucess:false,
            message:"You are not a registerd user please registor then apply for doctor"
           })
        }
        else{
            const doctor=await Doctor.findOne({userId})
            if(doctor){
                return res.status(200).json({
                    sucess:false,
                    message:"you are already a registered doctor",
                    data:doctor
                })
            }
            console.log("hi")
                const newDoctor =new Doctor({
                    userId,firstName,lastName,phone,email,website,address,specialization,experience,fee,startingTime,endingTime
                })
                console.log("newdoctor->",newDoctor)
                const updatedUser=await newDoctor.save();
                user.isDoctor=true;
                await user.save();
                console.log("updated->",updatedUser)
                
                res.status(200).json({
                    sucess:true,
                    data:updatedUser,
                    message:"You are sucessefully registered"
                })
            
        }
      } catch (error) {
        console.log(error)
        res.status(500).json({
            sucess:false,
            message:"Error in applying for doctor"
        })
      }
}

exports.getDoctor=async(req,res)=>{
    try{
       const doctor=await Doctor.find();
       console.log("doctor",doctor)
       res.status(200).json({
        sucess:true,
        data:doctor,
        message:"Doctor data fetched"
       })
   
    }
    catch(error){
res.status(500).json({
    sucess:false,
    message:"error in fetching data"
})
    }
}