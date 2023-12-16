import express from "express";
const router = express.Router()

import { doctorRegister,doctorLogin, doctorLogout } from '../controller/doctorController.js';


router.post('/register',doctorRegister)
router.post('/login',doctorLogin)
router.post('/logout',doctorLogout)



export default router

