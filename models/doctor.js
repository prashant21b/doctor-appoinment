const mongoose=require('mongoose')


const doctorSchema=new mongoose.Schema({
    userId:{
        type:String
    },
    firstName:{
        type:String,
        required:[true,'first name is required']
    },
    lastName:{
        type:String,
        required:[true,'last name is required']
    },
    phone:{
        type:String,
        required:[true,'phone no is required'],   
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    website:{
        type:String
    },
    address:{
type:String,
required:[true,'address is required']
    },
    specialization:{
        type:String,
        required:[true,'specialization is required']
    },
    experience:{
        type:String,
        required:[true,'experience is required']

    },
    fee:{
        type:Number,
        required:[true,'fee is reguired']
    },
    startingTime: {
        type:String,
        required: true,
      },
      endingTime: {
        type:String,
        required: true,
      },
      isVerified:{
        type:Boolean,
        default:false
      }

},{timestamps:true})

module.exports=mongoose.model("Doctor",doctorSchema);