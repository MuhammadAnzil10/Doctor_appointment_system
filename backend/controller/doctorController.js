import asyncHandler from "express-async-handler";
import generateMail from "../utils/generateMail.js";
import generateOtp from "../utils/generateOtp.js";
import Doctor from '../model/doctorModel.js'

const doctorLogin = asyncHandler(async (req, res) => {
  const {   name,email,phone,address,qualification,experience,
   specialization,password,cloudImage

   } = req.body;

   const doctor = await Doctor.findOne({email,phone})
   if(doctor){
    res.status(409)
    throw new Error("User already existing")
   }

console.log(address);
const newDoctor = await Doctor.create({
   name,
   email,
   phone,
   address:{
      street:address.street,
      city:address.city,
      state:address.state,
      country:address.country,
      pincode:address.zipcode
   },
   qualification,
   experience,
   specialization,
   images:cloudImage,
   password
  })

  const {password:Password,...rest} = newDoctor._doc
res.status(200).json({
   message:"Profile Submitted Successfully Wait for confimation email",
   doctorInfo : rest
})
   

  
  
});

export { doctorLogin };
