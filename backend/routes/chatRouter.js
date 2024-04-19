import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { accessChat, getChats } from "../controller/chatController.js";
const router = express.Router();


router.route('/').post(protect,accessChat)
router.route('/:userId').get(protect,getChats)



export default router;
