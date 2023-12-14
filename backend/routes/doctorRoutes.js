import express from "express";
const router = express.Router()

import { doctorLogin } from '../controller/doctorController.js';


router.get('/register',doctorLogin)


export default router

