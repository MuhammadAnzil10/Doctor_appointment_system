import jwt from 'jsonwebtoken'

const generateDoctorToken = (res,doctorId)=>{

  const  token = jwt.sign({doctorId},process.env.DOCTOR_JWT_SECRET,{expiresIn:'30d'})
  
  res.cookie('doctorToken',token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })

}


export default generateDoctorToken;