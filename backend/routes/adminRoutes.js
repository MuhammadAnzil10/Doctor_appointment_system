import express from "express";
import {
  adminLogin,
  adminLogout,
  getAllUsers,
  blockUser,
  unBlockUser,
  forgetPassword,
  verifyOtp,
  resetAdminPassword
} from "../controller/adminController.js";
import { adminProtect } from "../middleware/adminAuthMiddleware.js";
const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", adminLogout);
router.post("/forget-password", forgetPassword);
router.post("/otp-verify", verifyOtp);
router.post('/reset-password',resetAdminPassword)
router.route("/users").get(adminProtect, getAllUsers);
router.get("/user-block/:id", adminProtect, blockUser);
router.get("/user-unblock/:id", adminProtect, unBlockUser);

export default router;
