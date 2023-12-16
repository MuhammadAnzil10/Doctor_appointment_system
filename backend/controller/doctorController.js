import asyncHandler from "express-async-handler";
import generateMail from "../utils/generateMail.js";
import generateOtp from "../utils/generateOtp.js";
import Doctor from "../model/doctorModel.js";
import generateDoctorToken from "../utils/doctorToken.js";

const doctorRegister = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    address,
    qualification,
    experience,
    specialization,
    password,
    cloudImage,
  } = req.body;

  const doctor = await Doctor.findOne({ email, phone });
  if (doctor) {
    res.status(409);
    throw new Error("User already existing");
  }

  console.log(address);
  const newDoctor = await Doctor.create({
    name,
    email,
    phone,
    address: {
      street: address.street,
      city: address.city,
      state: address.state,
      country: address.country,
      pincode: address.zipcode,
    },
    qualification,
    experience,
    specialization,
    images: cloudImage,
    password,
  });

  const { password: Password, ...rest } = newDoctor._doc;
  res.status(200).json({
    message: "Profile Submitted Successfully Wait for confimation email",
    doctorInfo: rest,
  });
});

const doctorLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const doctor = await Doctor.findOne({ email });
  console.log(doctor);
  if (!doctor) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
  if (!doctor.isVerified) {
    res.status(401);
    throw new Error("Account is not verified");
  }
  if (doctor.isBlocked) {
    res.status(401);
    throw new Error("You have been blocked by administrator");
  }

  if (doctor.matchPassword(password)) {
    generateDoctorToken(res, doctor._id);
    res.status(200).json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
    });
  }
});

const doctorLogout =asyncHandler(async(req,res)=>{

   res.cookie("doctorToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
  
    return res.status(200).json({ message: "User Logged Out" });
})

export { doctorRegister, doctorLogin, doctorLogout };
