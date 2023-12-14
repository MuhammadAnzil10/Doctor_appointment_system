import asyncHandler from 'express-async-handler';
import generateMail from "../utils/generateMail.js";
import generateOtp from "../utils/generateOtp.js";


const doctorLogin =asyncHandler(async (req,res)=>{
       const {name,email,phone,address,qualification}=req.body
  })


export{
  doctorLogin,

}