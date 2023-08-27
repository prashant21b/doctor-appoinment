const jwt=require('jsonwebtoken')
require("dotenv").config();
module.exports=async (req,res,next)=>{
    try{
        //extract JWT token
        //PENDING : other ways to fetch token

        
        console.log("body" , req.body.jwtToken);
        console.log("header", req.header("Authorization"));
       
        const token = req.body.jwtToken || req.header("Authorization").replace("Bearer ", "");
        
        if(!token || token === undefined) {
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }

        //verify the token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            //why this ?
            req.user = payload.id;
        } catch(error) {
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    } 
    catch(error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
            error:error.message,
        });
    }
}