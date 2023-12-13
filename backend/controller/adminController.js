import asyncHandler from "express-async-handler";
import Admin from "../model/adminModel.js";
import generateAdminToken from "../utils/adminToken.js";
import User from "../model/userModel.js";

const adminLogin = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    generateAdminToken(res, admin._id);

    res.status(200).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const adminLogout = asyncHandler(async (req, res) => {
  res.cookie("adminToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({ message: "User Logged Out" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, "name phone age bloodGroup isBlocked");
  res.status(200).json(users);
});


const blockUser =asyncHandler(async(req,res)=>{
    

   const id = req.params.id;
   const user = await User.findById(id)
   if(!user){
    res.status(401)
    throw new Error('User not found')
   }
   user.isBlocked = true
   user.save()

   res.status(200)
   res.json({
    message:"User Blocked Successfully",
    isBlocked:true
   })
})

const unBlockUser =asyncHandler(async(req,res)=>{
    

  const id = req.params.id;
  const user = await User.findById(id)
  if(!user){
   res.status(401)
   throw new Error('User not found')
  }
  user.isBlocked = false
  user.save()

  res.status(200)
  res.json({
   message:"User Unblocked Successfully",
   isUnBlocked:true
  })
})





export { adminLogin, adminLogout, getAllUsers, blockUser, unBlockUser };
