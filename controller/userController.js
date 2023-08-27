
const USER=require('../models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const user = require('../models/user');
exports.loginController=async (req,res)=>{
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
          return res.status(400).json({
            success: false,
            message: "Please enter email and password",
          });
        }
        
        const user = await USER.findOne({ email });
        console.log("user",user)
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User does not exist. Please sign up.",
          });
        }
        
        const isMatched = await bcrypt.compare(password, user.password);
        
        if (!isMatched) {
          return res.status(401).json({
            success: false,
            message: "Incorrect password",
          });
        }
        
        const jwtToken = jwt.sign({id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "2d",
        });
        
        user.jwtToken = jwtToken;
        user.password = undefined;
        
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
          secure:false,
        };
        
        res.cookie("jwtToken", jwtToken, options).status(200).json({
          success: true,
          message: "Login successful",
          user,
          jwtToken,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Login failed",
        });
      }
    
}

exports.registorController=async (req,res)=>{
    try{
        const {name,email,password}=req.body;
const isUser=await USER.findOne({email})
if(isUser){
    return res.status(200).json({
        sucess:false,
        message:"user already exits"
    })
}
const hashedPassword=await bcrypt.hash(password,10)
 const newUser=new USER({
    name,
    email,
    password:hashedPassword,
 }
 )
  const savedUser=await newUser.save();
  res.status(200).json({
    sucess:true,
    data:savedUser,
    message:"new user created"
  })
    }
    catch(error){
console.log(error)
res.status(500).json({
    sucess:false,
    message:"error in registor",
})
    }
}

exports.test=async(req,res)=>{
  try{
    const user=await USER.findOne({_id:req.user})
console.log("user",user)
res.status(200).json({
  sucess:true,
  user,
  message:"user find"
})
  }
  catch(error){
   res.status(500).json({
    sucess:false,
    message:"not found"
   })
  }
}



exports.authCtrl=async (req,res)=>{
  try{
   
const user=await USER.findById({_id:req.user});
user.password=undefined;
console.log("user",user)
if(!user){
return res.status(200).json({
  message:"user not found",
  sucess:false,
})
}
else{
res.status(200).json({
  sucess:true,
  data:user,
})
}
  }
  catch(error){
    console.log(error)
    res.status(500).json({
      success:false,
      message:"auth error",
      error,
    })
  }
}

exports.getProfile=async(req,res)=>{
  try{
  const {id}=req.body;
  console.log(id);
  const user=await USER.findById(id);
  if(!user){
    return res.status(404).json({
      sucess:true,
      message:"You are not a registered user please registor"
    })
  }
  else{
    res.status(200).json({
      sucess:true,
      data:user,
      message:"user data fetched"
    })
  }
  }
  catch(error){
res.status(500).json({
  sucess:false,
  message:"error in fetching data"
})
  }
}

exports.getUser=async(req,res)=>{
  try{
     const user=await USER.find();
     console.log("user",user)
     res.status(200).json({
      sucess:true,
      data:user,
      message:"user gets"
     })
 
  }
  catch(error){
res.status(500).json({
  sucess:false,
  message:"error in fetching data"
})
  }
}


exports.getNotification=async(req,res)=>{
  try{
  const {id}=req.params;
  const user=await USER.findById(id);


  res.status(200).json({
    sucess:true,
    data:user.notifcation,
    message:"notification"
  })
  }
  catch(error){
res.status(500).json({
  sucess:false,
  message:"error in getting notification"
})
  }
}