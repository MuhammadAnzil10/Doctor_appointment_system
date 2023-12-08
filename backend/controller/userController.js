import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generateTokens.js";
import generateMail from "../utils/generateMail.js";
import generateOtp from "../utils/generateOtp.js";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const verificationCode = generateOtp();
  const user = await User.create({
    name,
    email,
    password,
    verificationCode,
  });

  const status = await generateMail(verificationCode, email);
  if (status?.success) {
    return res
      .status(200)
      .send("User registered successfully. Check your email for verification.");
  } else if (!status?.success) {
    return res.status(500).send("Server Temporarily not available");
  }

  if (user) {
    generateToken(res, user._id);
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user Data");
  }
});


const verifyOtp = asyncHandler(async(req,res)=>{
   
  const {email, verificationCode} = req.body;

  const user = await User.findOne({email,verificationCode})

  if(!user){
    return res.status(404).send('User not found or invalid verification code.');
  }

  user.isVerified = true
  await user.save()
  return res.status(200).send('Account verified successfully.');

})

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

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatdsUser = await user.save();
    return res.status(200).json({
      _id: updatdsUser._id,
      name: updatdsUser.name,
      email: updatdsUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { login, registerUser, logoutUser, getUserProfile, updateUserProfile, verifyOtp };
