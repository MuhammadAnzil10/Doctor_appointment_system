import express from "express";
import {
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
  unBlockDoctor
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
router.post("/specialization", adminProtect, addSpecialization);
router.get("/specializations", adminProtect, getAllSpecialization);
router.get('/doctors',adminProtect,getAllDoctors)
router.put('/verify-doctor/:id',adminProtect,verifyDoctor)
router.put('/block-doctor/:id',adminProtect,blockDoctor)
router.put('/unblock-doctor/:id',adminProtect,unBlockDoctor)

export default router;
