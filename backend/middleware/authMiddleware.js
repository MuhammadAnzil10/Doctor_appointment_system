import jwt from "jsonwebtoken";
import asyncHandler from "asyncHandler";
import User from "../model/userModel.js";

const protect = asyncHandler(async (req, rs, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorised, no token");
  }
});

export { protect };