import asyncHandler from 'express-async-handler'
import Admin from '../model/adminModel.js'
import generateAdminToken from '../utils/adminToken.js'



const adminLogin =asyncHandler(async(req,res)=>{

    let { email, password} = req.body

    const admin = await Admin.findOne({email})
    if(!admin && (await admin.matchPassword(password))){
      res.status(401)
      throw new Error("Invalid email or password")
    }

    generateAdminToken(res,admin._id)

    res.status(200)
    .json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    })
})


export {
  adminLogin
}