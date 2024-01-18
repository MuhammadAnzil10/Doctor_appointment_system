import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generateTokens.js";
import generateMail from "../utils/generateMail.js";
import generateOtp from "../utils/generateOtp.js";
import Doctor from "../model/doctorModel.js";
import Specialization from "../model/specialization.js";
import FavoriteDoctor from "../model/favoritesModel.js";
import Slot from "../model/slotModel.js";
import Appointment from "../model/appointmentModel.js";
import {
  createIntentStripe,
  retrievePaymentMetadata,
} from "../helpers/userHelper.js";
import Wallet from "../model/walletModel.js";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user.isBlocked) {
    res.status(401);
    throw new Error("You have been blocked by Administrator");
  }

  const passwordMatch = await user.matchPassword(password);
  if (user && passwordMatch) {
    generateToken(res, user._id);
    const {
      password: hashedPassword,
      verificationCode,
      createdAt,
      updatedAt,
      ...rest
    } = user._doc;

    return res.status(201).json(rest);
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, age, password, bloodGroup } = req.body;
  const userExist = await User.findOne({ $or: [{ email }, { phone }] });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const verificationCode = generateOtp();
  const user = await User.create({
    name,
    email,
    phone,
    age,
    password,
    bloodGroup,
    verificationCode,
  });

  const status = await generateMail(verificationCode, email);

  if (status?.success) {
    return res.status(200).json({
      message:
        "User registered successfully. Check your email for verification.",
      status: 200,
      userData: {
        name: user._doc.name,
        email: user._doc.email,
        phone: user._doc.phone,
        age: user._doc.age,
        bloodGroup: user._doc.bloodGroup,
      },
    });
  } else if (!status?.success) {
    res.status(500);
    throw new Error("Server Temporarily not available");
  }
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { email, verificationCode } = req.body;
  const user = await User.findOne({ email, verificationCode });

  if (!user) {
    res.status(400);
    throw new Error("Invalid user Data");
  }

  user.isVerified = true;
  await user.save();
  generateToken(res, user._id);
  const {
    password: hashedPassword,
    verificationCode: Verification,
    createdAt,
    updatedAt,
    ...rest
  } = user._doc;

  return res.status(201).json({
    ...rest,
    message: "Account verified successfully.",
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({ message: "User Logged Out" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  return res.status(200).json(user);
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const UserByMail = await User.findOne({ email: req.body.email });
  const UserByPhone = await User.findOne({ phone: req.body.phone });

  if (UserByMail && user.email !== UserByMail.email) {
    res.status(400);
    throw new Error("User already existed");
  }
  if (UserByPhone && UserByPhone.phone !== user.phone) {
    res.status(400);
    throw new Error("The phone number has been used");
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.age = req.body.age || user.age;
    user.bloodGroup = req.body.bloodGroup || user.bloodGroup;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    const {
      password: hashedPassword,
      verificationCode: Verification,
      createdAt,
      updatedAt,
      ...rest
    } = updatedUser._doc;

    return res.status(200).json({
      ...rest,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const resendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid User");
  }

  const verificationCode = generateOtp();
  const status = await generateMail(verificationCode, user.email);

  if (status.success) {
    user.verificationCode = verificationCode;
    await user.save();

    res.status(200).json({
      message:
        "Otp resend Successfully Please Check your email for Resend Otp.",
      status: 200,
    });
  } else if (!status?.success) {
    res.status(500);
    throw new Error("Server Temporarily not available");
  }
});

const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user.isBlocked) {
    res.status(401);
    throw new Error("You have been blocked by Administrator");
  }
  if (!user) {
    res.status(400);
    throw new Error("Invalid user");
  }

  const verificationCode = generateOtp();
  const status = await generateMail(verificationCode, user.email);

  if (status.success) {
    user.verificationCode = verificationCode;
    await user.save();

    res.status(200).json({
      message: "Verification OTP sent to email ",
      status: 200,
      userData: {
        name: user._doc.name,
        email: user._doc.email,
      },
    });
  } else if (!status?.success) {
    res.status(500);
    throw new Error("Server Temporarily not available");
  }
});

const resetPasswordOtpVerify = asyncHandler(async (req, res) => {
  const { email, verificationCode } = req.body;

  const user = await User.findOne({ email, verificationCode });

  if (!user) {
    res.status(400);
    throw new Error("Invalid User Data");
  }

  user.isVerified = true;
  await user.save();
  return res.status(200).json({
    message: "Otp verified successfully.",
    status: 200,
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    user.password = password;
    await user.save();
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      status: 200,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const userGetAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({ isBlocked: false, isVerified: true })
    .populate("specialization")
    .select("-password -__v");

  res.status(200).json(doctors);
});

const getDoctorById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const doctor = await Doctor.findById(id)
    .populate("specialization")
    .select("-password -__v");
  if (!doctor) {
    res.status(404);
    throw new Error("User not found");
  }

  return res.status(200).json(doctor);
});

const getAllSpecializations = asyncHandler(async (req, res) => {
  const specializations = await Specialization.find({ isBlocked: false });

  res.status(200).json(specializations);
});

const googleAuth = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findOne({ email });
  if (user && user.isBlocked) {
    res.status(400);
    throw new Error("Unauthorized");
  }

  if (user) {
    generateToken(res, user._id);
    const {
      password: hashedPassword,
      verificationCode,
      createdAt,
      updatedAt,
      ...rest
    } = user._doc;
    return res.status(201).json(rest);
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const newUser = await User.create({
      name,
      email,
      password: generatedPassword,
      bloodGroup: "unknwon",
      age: 0,
      phone: 0,
      isVerified: true,
    });
    generateToken(res, newUser._id);
    const {
      password: hashedPassword,
      verificationCode,
      createdAt,
      updatedAt,
      ...rest
    } = newUser._doc;
    return res.status(201).json(rest);
  }
});

const favourites = asyncHandler(async (req, res) => {
  const doctorId = req.body.id;
  let userFavourites = await FavoriteDoctor.findOne({
    user: req.user._id,
  }).populate({
    path: "doctor.doctorId",
    populate: { path: "specialization" },
  });

  if (!userFavourites) {
    const newFav = new FavoriteDoctor({
      user: req.user._id,
      doctor: [{ doctorId }],
    });
    const newFavourites = await newFav.save();

    return res.status(200).json({
      message: "Added to Favourites",
      updatedFavourites: newFavourites,
    });
  }

  const isDoctorInFavorites = userFavourites.doctor.some(
    (doctor) => doctor.doctorId._id.toString() === doctorId
  );

  if (isDoctorInFavorites) {
    userFavourites.doctor = userFavourites.doctor.filter(
      (doctor) => doctor.doctorId._id.toString() !== doctorId
    );

    await userFavourites.save();

    return res.status(200).json({
      message: "Favourite Removed",
      isRemoved: true,
      updatedFavourites: userFavourites,
    });
  } else {
    userFavourites.doctor.push({ doctorId });
    await userFavourites.save();
    userFavourites = await FavoriteDoctor.findOne({
      user: req.user._id,
    }).populate({
      path: "doctor.doctorId",
      populate: { path: "specialization" },
    });
    return res.status(200).json({
      message: "Added to Favourites",
      isAdded: true,
      updatedFavourites: userFavourites,
    });
  }
});

const getFavourites = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const favouriteDoctors = await FavoriteDoctor.findOne({
    user: userId,
  }).populate({
    path: "doctor.doctorId",
    populate: { path: "specialization" },
  });

  return res.status(200).json({ favouriteDoctors });
});

const getSlotByDate = asyncHandler(async (req, res) => {
  const { date, doctorId } = req.params;

  const slots = await Slot.find({
    date: new Date(date),
    doctor: doctorId,
    isBooked: false,
  }).select("-__v");

  return res.json(slots);
});

const createPaymentIntent = asyncHandler(async (req, res) => {
  const { slotId, doctorId } = req.body;

  const doctor = await Doctor.findById(doctorId);
  const consultationFee = doctor.consultationFee;
  const { success, paymentIntent } = await createIntentStripe({
    amount: consultationFee,
    slotId,
    doctorId,
  });

  if (!success) {
    res.status(400);
    throw new Error("Error creating Payment Intent");
  }

  res.status(200).json({ clientSecret: paymentIntent.client_secret });
});

const confirmPayment = asyncHandler(async (req, res) => {
  const { paymentIntentId } = req.body;

  const { success, paymentIntent } = await retrievePaymentMetadata(
    paymentIntentId
  );

  if (!success) {
    res.status(400);
    throw new Error("Failed to retrieve payment data Please retry");
  }
  const metadata = paymentIntent.metadata;
  const { doctorId, slotId } = metadata;
  const doctor = await Doctor.findById(doctorId);
  const slot = await Slot.findById(slotId);
  if (slot.isBooked) {
    res.status(400);
    throw new Error("This slot is already booked.");
  }
  const appointment = await Appointment.create({
    userId: req.user._id,
    doctorId,
    slotId,
    appointmentDate: slot.date,
    appointmentTime: slot.startTime,
    paymentStatus: "Completed",
    consultationFee: doctor.consultationFee,
    paymentMethod: "Online",
  });
  const updatedSlot = await Slot.findByIdAndUpdate(slotId, {
    $set: { isBooked: true },
  });
  res.status(200).json(appointment);
});

const makePayment = asyncHandler(async (req, res) => {
  const { doctorId, slotId, paymentMethod } = req.body;
  const userId = req.user._id;
  const doctor = await Doctor.findById(doctorId);
  const wallet = await Wallet.findOne({ userId });
  const slot = await Slot.findById(slotId);
  const consultationFee = doctor.consultationFee;
  if (paymentMethod === "Wallet") {
    if (!wallet || wallet?.balance < consultationFee) {
      res.status(400);
      throw new Error("Please Check Your wallet balance");
    }
  }

  if (slot.isBooked) {
    res.status(400);
    throw new Error("Sorry! This slot has been booked");
  }

  const appointment = await Appointment.create({
    userId: req.user._id,
    doctorId,
    slotId,
    appointmentDate: slot.date,
    appointmentTime: slot.startTime,
    paymentStatus: "Completed",
    consultationFee,
    paymentMethod,
  });
  const updatedSlot = await Slot.findByIdAndUpdate(slotId, {
    $set: { isBooked: true },
  });
  if (paymentMethod === "Wallet") {
    wallet.balance -= consultationFee;
    wallet.transactions.unshift({type:'debit',amount:consultationFee});
    await wallet.save();

    return res.status(200).json({wallet,appointment})
  }
 
 return res.status(200).json(appointment);
});

const getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await Appointment.find({ userId: req.user._id })
    .populate("slotId")
    .populate({
      path: "doctorId",
      populate: { path: "specialization" },
    });

  const userBookings = bookings.map((booking, index) => {
    booking.doctorId.password = "";
    booking.doctorId.verificationCode = "";

    return booking;
  });
  res.status(200).json(userBookings);
});

const userWallet = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const {amount} = req.body
  let wallet = await Wallet.findOne({ userId });
  console.log(wallet);
  const transaction = {
    amount: Number(amount),
    type: "credit",
  };
  if (!wallet) {
    wallet =await Wallet.create({
      userId,
      balance: Number(amount),
      transactions: [transaction],
    });
  } else {
    wallet.balance += Number(amount);
    wallet.transactions.push(transaction);
    await wallet.save()
  }
  res.status(200).json(wallet);
});

const getUserWallet = asyncHandler(async(req,res)=>{

      const userId = req.user;
      const userWallet=await Wallet.findOne({userId}).select('-__v')

      res.json(userWallet);
})

export {
  login,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  verifyOtp,
  resendOtp,
  forgetPassword,
  resetPassword,
  resetPasswordOtpVerify,
  userGetAllDoctors,
  getDoctorById,
  getAllSpecializations,
  googleAuth,
  favourites,
  getFavourites,
  getSlotByDate,
  createPaymentIntent,
  confirmPayment,
  makePayment,
  getUserBookings,
  userWallet,
  getUserWallet,
};
