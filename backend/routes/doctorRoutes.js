import express from "express";
const router = express.Router()

import { doctorLogin } from '../controller/doctorController.js';


router.post('/register',doctorLogin)


export default router

