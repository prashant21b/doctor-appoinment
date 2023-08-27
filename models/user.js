const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
name:{
    type:String,
    require:true,
},
email:{
    type:String,
    require:true,
},
password:{
    type:String,
    require:true,
},
isAdmin: {
    type: Boolean,
    default: false,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  notifcation: {
    type: Array,
    default: [],
  },
})

module.exports=mongoose.model('USER',userSchema);