import express from 'express'
import { adminLogin, adminLogout,getAllUsers } from '../controller/adminController.js'
import { adminProtect } from '../middleware/adminAuthMiddleware.js'
const router = express.Router()




router.post('/login',adminLogin)
router.post('/logout',adminLogout)
router.get('/users',adminProtect,getAllUsers)





export default router