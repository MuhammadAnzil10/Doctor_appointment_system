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
    return res.status(200).json({
      message:
        "User registered successfully. Check your email for verification.",
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
  return res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
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
      userData:{
        name:user._doc.name,
        email:user._doc.email
      }
    });
  } else if (!status?.success) {
    res.status(500);
    throw new Error("Server Temporarily not available");
  }
});

const resetPasswordOtpVerify = asyncHandler(async (req, res) => {

        const {email,verificationCode}= req.body;

        const user = await User.findOne({email,verificationCode})

        if(!user){
          res.status(400)
          throw new Error('Invalid User Data')
        }
        user.isVerified = true;
        await user.save();
        return res.status(201).json({
          message: "Otp verified successfully.",
        });


});

const resetPassword = asyncHandler(async()=>{
      
       
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
  resetPasswordOtpVerify
};
