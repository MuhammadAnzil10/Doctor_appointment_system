import express from "express";
import {
  registerUser,
  getUserProfile,
  logoutUser,
  updateUserProfile,
  login,
  verifyOtp
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
