import asyncHandler from "express-async-handler";
import generateMail from "../utils/generateMail.js";
import generateOtp from "../utils/generateOtp.js";
import Doctor from "../model/doctorModel.js";
import generateDoctorToken from "../utils/doctorToken.js";
import Slot from "../model/slotModel.js";
import Appointment from "../model/appointmentModel.js";
import { formatTime } from "../helpers/doctorHelper.js";
import Wallet from "../model/walletModel.js";
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

  const doctor = await Doctor.findOne({ email }).populate("specialization");

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

  if (await doctor.matchPassword(password)) {
    generateDoctorToken(res, doctor._id);
    res.status(200).json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      qualification: doctor.qualification,
      specialization: doctor.specialization.name,
      images: doctor.images,
      experience: doctor.experience,
      consultaionFee: doctor.consultaionFee,
    });
  } else {
    res.status(401);
    throw new Error("Password not match");
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
  if (!doctor) {
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

const doctorOtpVerification = asyncHandler(async (req, res) => {
  const { email, verificationCode } = req.body;

  const doctor = await Doctor.findOne({ email, verificationCode });

  if (!doctor) {
    res.status(404);
    throw new Error("User not found");
  }
  doctor.isVerified = true;
  await doctor.save();
  return res.status(200).json({
    message: "Otp verified successfully.",
    email: doctor.email,
    status: 200,
  });
});

const doctorResetPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const doctor = await Doctor.findOne({ email });

  if (doctor) {
    doctor.password = password;
    await doctor.save();
    generateDoctorToken(res, doctor._id);
    res.status(200).json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      isBlocked: doctor.isBlocked,
      status: 200,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getDoctorProfile = asyncHandler(async (req, res) => {
  const doctor = {
    name: req.doctor.name,
    email: req.doctor.email,
    phone: req.doctor.phone,
    images: req.doctor.images,
    qualification: req.doctor.qualification,
    experience: req.doctor.experience,
    specialization: req.doctor.specialization,
    consultaionFee: req.doctor.consultaionFee,
  };
  return res.status(200).json(doctor);
});

const editDoctorProfile = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.doctor._id)
    .select("-__v -isVerified -isBlocked -verificationCode -address")
    .populate("specialization");
  if (!doctor) {
    res.status(404);
    throw new Error("User not found");
  }

  doctor.email = req.body.email || doctor.email;
  doctor.phone = req.body.phone || doctor.phone;
  doctor.qualification = req.body.qualification || doctor.qualification;
  doctor.experience = req.body.experience || doctor.experience;
  doctor.specialization = req.body.specialization || doctor.specialization;
  doctor.consultationFee = req.body.consultationFee || doctor.consultationFee;

  if (req.body.password) {
    doctor.password = req.body.password;
  }

  const updatedDoctor = await doctor.save();
  const { password, specialization, ...rest } = updatedDoctor._doc;

  res.status(200).json({
    specialization: specialization.name,
    ...rest,
  });
});

const createSlot = asyncHandler(async (req, res) => {
  const { date, startTime, endTime, doctorId } = req.body;
  const { updatedStartTime, updatedEndTime } = formatTime(startTime, endTime);

  const existingSlot = await Slot.findOne({
    date: new Date(date),
    startTime: updatedStartTime,
    endTime: updatedEndTime,
  });

  if (existingSlot) {
    res.status(400);
    throw new Error("This slot already exists");
  }
  if (startTime > endTime) {
    res.status(400);
    throw new Error("Please select correct time range");
  }

  const newSlot = await Slot.create({
    doctor: doctorId,
    date: new Date(date),
    startTime: updatedStartTime,
    endTime: updatedEndTime,
  });
  return res.json(newSlot);
});

const getSlotsBydate = asyncHandler(async (req, res) => {
  const { slotsDate } = req.body;
  const slots = await Slot.find({ date: new Date(slotsDate) });

  res.status(200).json(slots);
});

const getDoctorAppointmets = asyncHandler(async (req, res) => {
  const doctorId = req.doctor._id;

  const appointments = await Appointment.find({ doctorId }).populate(
    "userId",
    "-password -verificationCode"
  );
  res.json(appointments);
});

const removeSlot = asyncHandler(async (req, res) => {
  const { slotId } = req.body;

  if (!slotId) {
    res.status(400);
    throw new Error("Please Select Slot");
  }

  const updatedData = await Slot.deleteOne({ _id: slotId });

  res.status(200).json(updatedData);
});

const makeAsConsulted = asyncHandler(async (req, res) => {
  const { appointmentId } = req.body;

  if (!appointmentId) {
    res.status(400);
    throw new Error("Please select appointment");
  }

  const updatedAppointment = await Appointment.findByIdAndUpdate(
    appointmentId,
    { appointmentStatus: "Consulted" },
    { new: true }
  ).populate("userId", "-password -verificationCode");

  return res.status(200).json(updatedAppointment);
});

const cancelAppointment = asyncHandler(async (req, res) => {
  const { appointmentId } = req.body;

  const updatedAppointment = await Appointment.findByIdAndUpdate(
    appointmentId,
    { appointmentStatus: "Cancelled" },
    { new: true }
  ).populate("userId", "-password -verificationCode");

  if (
    updatedAppointment.appointmentStatus === "Cancelled" &&
    updatedAppointment.paymentMethod === "Wallet"
  ) {
    const { userId } = updatedAppointment;
    const userWallet = await Wallet.findOne({ userId: userId._id });
    if (userWallet) {
      let totalAmount =
        Number(userWallet.balance) + Number(updatedAppointment.consultationFee);
      userWallet.balance = totalAmount;
      userWallet.transactions.unshift({
        type: "credit",
        amount: updatedAppointment.consultationFee,
        transactionBalance: totalAmount,
      });

      await userWallet.save();
    }
  }
  return res.json(updatedAppointment);
});

export {
  doctorRegister,
  doctorLogin,
  doctorLogout,
  doctorForgetPassword,
  doctorOtpVerification,
  doctorResetPassword,
  getDoctorProfile,
  editDoctorProfile,
  createSlot,
  getSlotsBydate,
  getDoctorAppointmets,
  removeSlot,
  makeAsConsulted,
  cancelAppointment,
};
