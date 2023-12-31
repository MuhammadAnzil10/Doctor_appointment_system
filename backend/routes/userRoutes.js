import express from "express";
import {
  registerUser,
  getUserProfile,
  logoutUser,
  updateUserProfile,
  login,
  verifyOtp,
  resendOtp,
  forgetPassword,
  resetPasswordOtpVerify,
  resetPassword,
  userGetAllDoctors,
  getDoctorById,
  getAllCategories,
  googleAuth
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/google-auth", googleAuth);
router.post("/verify-otp", verifyOtp);
router.post('/resend-otp',resendOtp)
router.post('/forget-password',forgetPassword)
router.route('/reset-password').post(resetPasswordOtpVerify).put(resetPassword)
router.post("/login", login);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
  router.get('/doctors',protect,userGetAllDoctors)
  router.post('/doctor/:id',protect,getDoctorById)
  router.get('/doctor-specializations',protect,getAllCategories)



export default router;
