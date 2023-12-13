import jwt from 'jsonwebtoken'


const generateAdminToken =(res,adminId)=>{

  const adminToken = jwt.sign({adminId},process.env.ADMIN_JWT_SECRET,{expiresIn:"30d"});

  res.cookie("adminToken", adminToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });


}

export default generateAdminToken;