import express from 'express'
import { adminLogin, adminLogout,getAllUsers, blockUser, unBlockUser } from '../controller/adminController.js'
import { adminProtect } from '../middleware/adminAuthMiddleware.js'
const router = express.Router()




router.post('/login',adminLogin)
router.post('/logout',adminLogout)
router.route('/users').get(adminProtect,getAllUsers)
router.get('/user-block/:id',adminProtect,blockUser)
router.get('/user-unblock/:id',adminProtect,unBlockUser)





export default router