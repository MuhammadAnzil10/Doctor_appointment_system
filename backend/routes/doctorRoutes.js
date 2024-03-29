import express from "express";
const router = express.Router();

import {
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
  getDoctorAppointmets
} from "../controller/doctorController.js";
import { doctorProtect } from "../middleware/doctorAuthMiddleware.js";

router.post("/register", doctorRegister);
router.post("/forget-password", doctorForgetPassword);
router.post("/verify-otp", doctorOtpVerification);
router.post("/reset-password", doctorResetPassword);
router.post("/login", doctorLogin);
router.post("/logout", doctorLogout);
router.post('/create-slot',doctorProtect,createSlot)
router.post('/slots',doctorProtect,getSlotsBydate)
router.route('/doctor-profile').get(doctorProtect,getDoctorProfile).put(doctorProtect,editDoctorProfile)
router.get('/appointments',doctorProtect,getDoctorAppointmets)

export default router;
