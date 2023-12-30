import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
import Doctor from '../model/doctorModel.js';


const doctorProtect =asyncHandler( async(req,res,next)=>{


  const token = req.cookies.doctorToken;

  if(token){
    try {
      const decoded =  jwt.verify(token,process.env.DOCTOR_JWT_SECRET)
      
      req.doctor = await Doctor.findById(decoded.doctorId).select("-password").populate('specialization');

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }

  }else{
    res.status(401);
    throw new Error("Not Authorised, no token");
  }

})



export {doctorProtect}
