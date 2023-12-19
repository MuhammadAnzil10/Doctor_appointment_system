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


  if (doctor && doctor.isBlocked) {
    res.status(401);
    throw new Error("You have been blocked by Administator");
  }

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
   
  if (await (doctor.matchPassword(password))) {
    generateDoctorToken(res, doctor._id);
    res.status(200).json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
    });
  }else{
    res.status(401)
    throw new Error('Password not match')
    }
});

const doctorLogout = asyncHandler(async (req, res) => {
  res.cookie("doctorToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({ message: "User Logged Out" });
});

const doctorForgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const doctor = await Doctor.findOne({ email });
      if(!doctor){
        res.status(404);
    throw new Error("User Not found");
      }
  if (doctor.isBlocked) {
    res.status(401);
    throw new Error("You have been blocked by administrator");
  }
  if (!doctor.isVerified) {
    res.status(403);
    throw new Error("You account verification is on processing...");
  }

  const verificationCode = generateOtp();

  const status = await generateMail(verificationCode, email);

  if (status.success) {
    doctor.verificationCode = verificationCode;
    await doctor.save();
    res.status(200).json({
      message:
        "Email has sent to your registered Email Id with OTP for Verification.",
      status: 200,
      doctorData: {
        name: doctor._doc.name,
        email: doctor._doc.email,
      },
    });
  } else if (!status?.success) {
    res.status(500);
    throw new Error("Server Temporarily not available");
  }
});

const doctorOtpVerification = asyncHandler(async (req,res ) => {
  const { email, verificationCode } = req.body;

  const doctor = await Doctor.findOne({ email,verificationCode });

  if (!doctor) {
    res.status(404);
    throw new Error("User not found");
  }
  doctor.isVerified = true;
  await doctor.save();
  return res.status(200).json({
    message: "Otp verified successfully.",
    email:doctor.email,
    status:200
  });

  
});

const doctorResetPassword =asyncHandler(async(req,res)=>{

  const {email,password}=req.body

  const doctor = await Doctor.findOne({email})

  if (doctor) {
    doctor.password=password;
    await doctor.save()
    generateDoctorToken(res,doctor._id)
    res.status(200).json({ 
    _id: doctor._id,
    name: doctor.name,
    email: doctor.email,
    isBlocked:doctor.isBlocked, 
    status:200
  });
  } else  {
    res.status(404)
    throw new Error("User not found")
  }
})

export {
  doctorRegister,
  doctorLogin,
  doctorLogout,
  doctorForgetPassword,
  doctorOtpVerification,
  doctorResetPassword
};
