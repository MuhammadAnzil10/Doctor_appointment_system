import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";

const chatAuth = asyncHandler(async (req, res, next) => {
  let user = req?.cookies?.jwt;
  let doctor = req?.cookies?.doctorToken
   
  if (user) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if(decoded)
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  }else if(doctor){
    const decoded = jwt.verify(doctor, process.env.DOCTOR_JWT_SECRET);
    if(decoded)
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorised, no token");
  }
});

export { protect };
