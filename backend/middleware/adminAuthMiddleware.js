import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
import adminModal from '../model/adminModel.js';


const adminProtect = (res,adminId)=>{

  const token = req.cookies.adminToke
  console.log(token);

}



export {adminProtect}
