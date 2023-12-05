import express from 'express'
import { registerUser,getUserProfile,logoutUser,updateUserProfile, login } from '../controller/userController.js';

const router = express.Router();

router.post('/',registerUser)
router.post('/login',login)
router.post('/logout',logoutUser)
router.route('/profile').get(getUserProfile).put(updateUserProfile)

export default router