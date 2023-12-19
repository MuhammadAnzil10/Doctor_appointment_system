import express from "express";
const router = express.Router();

import {
  doctorRegister,
  doctorLogin,
  doctorLogout,
  doctorForgetPassword,
  doctorOtpVerification,
  doctorResetPassword,
} from "../controller/doctorController.js";

router.post("/register", doctorRegister);
router.post("/forget-password", doctorForgetPassword);
router.post("/verify-otp", doctorOtpVerification);
router.post("/reset-password", doctorResetPassword);

router.post("/login", doctorLogin);
router.post("/logout", doctorLogout);

export default router;
