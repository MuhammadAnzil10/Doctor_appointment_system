import asyncHandler from "express-async-handler";
import Admin from "../model/adminModel.js";
import generateAdminToken from "../utils/adminToken.js";
import User from "../model/userModel.js";
import generateOtp from "../utils/generateOtp.js";
import generateMail from "../utils/generateMail.js";
import Specialization from "../model/specialization.js";
import Doctor from "../model/doctorModel.js";
import generateVerificationMail from "../utils/generateVerificationMail.js";

const adminLogin = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    generateAdminToken(res, admin._id);

    res.status(200).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const adminLogout = asyncHandler(async (req, res) => {
  res.cookie("adminToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({ message: "User Logged Out" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, "name phone age bloodGroup isBlocked");
  res.status(200).json(users);
});

const blockUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  user.isBlocked = true;
  user.save();

  res.status(200);
  res.json({
    message: "User Blocked Successfully",
    isBlocked: true,
  });
});

const unBlockUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  user.isBlocked = false;
  user.save();

  res.status(200);
  res.json({
    message: "User Unblocked Successfully",
    isUnBlocked: true,
  });
});

const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin) {
    res.status(401);
    throw new Error("Invalid User");
  }

  const verificationCode = generateOtp();
  const status = await generateMail(verificationCode, admin.email);
  if (status.success) {
    admin.verificationCode = verificationCode;
    await admin.save();

    res.status(200).json({
      message: "Verification OTP sent to email ",
      status: 200,
      adminData: {
        name: admin._doc.name,
        email: admin._doc.email,
      },
    });
  } else if (!status?.success) {
    res.status(500);
    throw new Error("Server Temporarily not available");
  }
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { verificationCode, email } = req.body;

  const admin = await Admin.findOne({ email, verificationCode });

  if (!admin) {
    res.status(400);
    throw new Error("Invalid admin Data");
  }
  admin.isVerified = true;
  await admin.save();
  return res.status(200).json({
    message: "Otp verified successfully.",
    status: 200,
  });
});

const resetAdminPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin) {
    admin.password = password;
    await admin.save();
    generateAdminToken(res, admin._id);
    res.status(200).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      status: 200,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const addSpecialization = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  let specializationRegx = new RegExp(name, "i");

  const specialization = await Specialization.findOne({
    name: specializationRegx,
  });

  if (specialization) {
    res.status(409);
    throw new Error("Specialization already existing");
  }

  const newSpecialization = await Specialization.create({
    name,
    description,
  });

  res.status(200).json({
    message: "Specialization created...",
    data: newSpecialization,
  });
});

const getAllSpecialization = asyncHandler(async (req, res) => {
  const specializations = await Specialization.find();
  res.status(200).json(specializations);
});

const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find().select("-password -__v");

  res.status(200).json(doctors);
});

const verifyDoctor = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const doctor = await Doctor.findById(id);

  if (!doctor) {
    res.status(404);
    throw new Error("User not found");
  }

  const status = await generateVerificationMail(doctor.email);
  console.log(status);
  if (status.success) {
    doctor.isVerified = true;
    doctor.save();

    res.status(200).json({
      message: "Verified Successfully",
      status: 200,
    });
  } else if (!status?.success) {
    res.status(500);
    throw new Error("Server Temporarily not available");
  }
});

const blockDoctor = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const doctor = await Doctor.findById(id);
  if (!doctor) {
    res.status(404);
    throw new Error("Doctor Not Found");
  }

  doctor.isBlocked = true;
  
  doctor.save();
  res.status(200);
  res.json({
    message: "User Blocked Successfully",
    isBlocked: true,
  });
});

const unBlockDoctor = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const doctor = await Doctor.findById(id);

  if (!doctor) {
    res.status(404);
    throw new Error("No User founded");
  }
  doctor.isBlocked = false;
  doctor.save();
  res.status(200);
  res.json({
    message: "User Unblocked Successfully",
    isUnBlocked: true,
  });
});

export {
  adminLogin,
  adminLogout,
  getAllUsers,
  blockUser,
  unBlockUser,
  forgetPassword,
  verifyOtp,
  resetAdminPassword,
  addSpecialization,
  getAllSpecialization,
  getAllDoctors,
  verifyDoctor,
  blockDoctor,
  unBlockDoctor,
};
