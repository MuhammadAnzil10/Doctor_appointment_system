import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
import Admin from '../model/adminModel.js';


const adminProtect =asyncHandler( async(req,res,next)=>{


  const token = req.cookies.adminToken;

  if(token){
    try {
      const decoded =  jwt.verify(token,process.env.ADMIN_JWT_SECRET)
    
      req.admin = await Admin.findById(decoded.adminId).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }

  }else{
    res.status(401);
    throw new Error("Not Authorised, no token");
  }

})



export {adminProtect}
